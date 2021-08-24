

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

    // Docs: https://www.chess.com/news/view/published-data-api
    const getChesscomInfo = async () => {
        console.log("GET: getChesscomInfo", id);
        const url = `https://api.chess.com/pub/player/${id}/stats`;

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

    const data = await getChesscomInfo().catch(e => {
        console.log("error", e);
    });

    console.log(data);

    if(data && data.code) {

        try {
            const params = {
                TableName: memberTable,
                Key: {
                    id: userSub
                },
                UpdateExpression: "set chesscomUsername=:username, chesscomInfo=:json",
                ExpressionAttributeValues: {
                    ":username": id,
                    ":json": JSON.parse(data),
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
            body: JSON.stringify(data),
        };
    } else {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(data),
        };
    }
};

