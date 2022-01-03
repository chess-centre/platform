const https = require('https');
const AWS = require("aws-sdk");
const { API_CHESSPLAYERS_MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = API_CHESSPLAYERS_MEMBERTABLE_NAME;

exports.handler = async (event) => {

    const {
        requestContext: { identity },
    } = event;

    if (!identity || !identity.cognitoAuthenticationProvider) {
        return {
            statusCode: 401,
            body: "Unauthorized",
        };
    }

    const [userSub] = identity.cognitoAuthenticationProvider.split(":").slice(-1);
    console.log("userSub", userSub);

    const { id } = event.pathParameters;

    if (!id) {
        return {
            statusCode: 404,
            body: "Must supply a username.",
        };
    }

    // Docs: https://www.chess.com/news/view/published-data-api
    const fetch = async (url) => {
        console.log("GET: getChesscomInfo", id);
        console.log("URL:", url);
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                let data = "";
                response.on("data", chunk => {
                    data += chunk;
                });
                response.on("end", () => {
                    resolve(data);
                });
                response.on("error", (e) => {
                    reject("error", e);
                });
            });
        });
    };

    const info = `https://api.chess.com/pub/player/${id.toLowerCase()}`;
    const stats = `https://api.chess.com/pub/player/${id.toLowerCase()}/stats`;

    const statsResponse = await fetch(stats).catch(e => {
        console.log("error", e);
    });

    const infoResponse = await fetch(info).catch(e => {
        console.log("error", e);
    });

    let parsedStats = null;
    let parsedInfo = null;

    try {
        parsedStats = JSON.parse(statsResponse);
        console.log("parsed stats", parsedStats);

        parsedInfo = JSON.parse(infoResponse);
        console.log("parsed info", parsedInfo);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 404,
            body: "Error parsing response data",
        };
    }

    if (parsedInfo && parsedStats && (parsedStats.chess_rapid || parsedStats.chess_blitz)) {
        try {
            console.log("updating db");
            const params = {
                TableName: memberTable,
                Key: {
                    id: userSub
                },
                UpdateExpression: "set chesscomUsername=:username, chesscomInfo=:json, chesscomLastUpdated=:updated",
                ExpressionAttributeValues: {
                    ":username": id,
                    ":json": { ...parsedInfo, ...parsedStats },
                    ":updated": Date.now()
                },
                ReturnValues: "UPDATED_NEW"
            };
            const response = await dynamodb.update(params).promise();
            console.log(response);
        } catch (error) {
            console.log("Error updating DynamoDB", error);
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ ...parsedInfo, ...parsedStats }),
        };
    } else {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify("error data undefined"),
        };
    }
};