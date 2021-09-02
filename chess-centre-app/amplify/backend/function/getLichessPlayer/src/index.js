

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

    // Docs: https://lichess.org/api#operation/apiUser
    const getLiChessInfo = async () => {
        console.log("GET: getLiChessInfo", id);
        const url = `https://lichess.org/api/user/${id}`;

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

    const data = await getLiChessInfo().catch(e => {
        console.log("error", e);
    });

    if(data) {
        const params = {
            TableName: memberTable,
            Key: {
                id: userSub
            },
            UpdateExpression: "set liChessUsername=:username, liChessInfo=:json",
            ExpressionAttributeValues: {
                ":username": id,
                ":json": JSON.parse(data),
            },
            ReturnValues: "UPDATED_NEW"
        };
        const response = await dynamodb.update(params).promise();
        console.log(response);

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
            body: JSON.stringify({ error: "User not found!"}),
        };
    }
};

