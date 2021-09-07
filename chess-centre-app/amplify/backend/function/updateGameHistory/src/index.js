
const AWS = require("aws-sdk");
const { API_MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const getGameInfo = require("./getGameInfo").getGameInfo;

exports.handler = async (event) => {


    try {
        
        // const {
        //     Items
        // } = await dynamodb.scan({
        //     TableName: API_MEMBERTABLE_NAME,
        //     FilterExpression: "attribute_exists(ecfId)"
        // }).promise();

        const games = await getGameInfo("266e23de-3ead-4afd-8115-c34a3bcb2e7b");
        console.log(games);

    } catch (error) {
        
    }



    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
