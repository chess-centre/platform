const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_TRAINS_EVENTTABLE_NAME } = process.env;
const getTrainInfo = require("./trainAPI").getTrainInfo;

exports.handler = async (event) => {

    const { pathParameters: { eventId: id }, body} = event;

    const params = {
        TableName: API_TRAINS_EVENTTABLE_NAME,
        Key: {
            "id": id
        }
    };
    
    const { Item: { startDate }} = await dynamodb.get(params).promise();
    const { eventStart, eventEnd } = JSON.parse(body);
    console.log(`eventStart ${eventStart}, eventEnd ${eventEnd}`);

    const departures = await getTrainInfo("ILK", startDate, eventEnd);

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(departures),
    };
    return response;
};
