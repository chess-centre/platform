<<<<<<< HEAD
=======


>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
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
<<<<<<< HEAD
            statusCode: 401,
            body: "Unauthorized",
=======
          statusCode: 401,
          body: "Unauthorized",
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
        };
    }

    const [userSub] = identity.cognitoAuthenticationProvider.split(":").slice(-1);
    console.log("userSub", userSub);

    const { id } = event.pathParameters;

    if (!id) {
        return {
<<<<<<< HEAD
            statusCode: 404,
            body: "Must supply a username.",
        };
    };
=======
          statusCode: 404,
          body: "Must supply a username.",
        };
    }
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484

    const url = `https://api.chess.com/pub/player/${id.toLowerCase()}/stats`;

    // Docs: https://www.chess.com/news/view/published-data-api
    const getChesscomInfo = async () => {
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

    const data = await getChesscomInfo().catch(e => {
        console.log("error", e);
    });

<<<<<<< HEAD
    let parsedData = null;

    try {
        parsedData = JSON.parse(data);
        console.log("parsed data", parsedData);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 404,
            body: "Error parsing response data",
        };
    }

    if (parsedData && (parsedData.chess_rapid || parsedData.chess_blitz)) {
=======
    console.log(data);

    if(data && !data.code === 0) {
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
        try {
            console.log("updating db");
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
<<<<<<< HEAD
            },
            body: JSON.stringify(data),
        };
    } else {
=======
            }, 
            body: JSON.stringify(data),
        };
    } else {
        console.log("User not found", data);
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
<<<<<<< HEAD
            },
=======
            }, 
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
            body: JSON.stringify(data),
        };
    }
};

