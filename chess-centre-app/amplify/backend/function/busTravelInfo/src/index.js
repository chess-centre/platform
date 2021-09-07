const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_BUS_EVENTTABLE_NAME } = process.env;
const getBusInfo = require("./busAPI").getBusInfo;
const BUS_STOP_ATCOCODE = 450014145;

exports.handler = async (event) => {

    const { eventId } = event.pathParameters;

    const params = {
        TableName: API_BUS_EVENTTABLE_NAME,
        Key: {
            "id": eventId
        }
    };
    
    const { Item: { startDate }} = await dynamodb.get(params).promise();
    const departures = await getBusInfo(BUS_STOP_ATCOCODE, startDate, "15:00");

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

