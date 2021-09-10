const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_BUS_EVENTTABLE_NAME } = process.env;
const getBusInfo = require("./busAPI").getBusInfo;
const BUS_STOP_ATCOCODE = 450014145;

exports.handler = async (event) => {
    
    const { pathParameters: { eventId: id }, body } = event;
    const params = {
        TableName: API_BUS_EVENTTABLE_NAME,
        Key: {
            "id": id
        }
    };
    const { Item: { startDate }} = await dynamodb.get(params).promise();
    const { eventStart, eventEnd } = JSON.parse(body);
    console.log(`eventStart ${eventStart}, eventEnd ${eventEnd}`);

    const departures = await getBusInfo(BUS_STOP_ATCOCODE, startDate, eventEnd);

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

