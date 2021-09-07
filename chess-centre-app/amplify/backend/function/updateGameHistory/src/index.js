const AWS = require("aws-sdk");
const { API_MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const getGameInfo = require("./getGameInfo").getGameInfo;

exports.handler = async (event) => {

    try {        
        const {
            Items: members
        } = await dynamodb.scan({
            TableName: API_MEMBERTABLE_NAME,
            FilterExpression: "attribute_exists(ecfId)"
        }).promise();
        
        const updated = members.map(async member => {
            const games = await getGameInfo(member.id);
            console.log(games);
            const params = {
                TableName: API_MEMBERTABLE_NAME,
                Key: {
                    id: member.id
                },
                UpdateExpression: "set gameInfo=:info",
                ExpressionAttributeValues: {
                    ":info": games
                },
                ReturnValues: "UPDATED_NEW"
            };
            const response = await dynamodb.update(params).promise();
            console.log(`Saving game data for ${member.name}`);
            return response;
        });
        const complete = await Promise.all(updated);
        console.log(`All ${complete.length} member game info updates complete.`);

    } catch (error) {
        console.log(error);
    };
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
