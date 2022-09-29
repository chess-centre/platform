const AWS = require("aws-sdk");
const { EVENT_TYPE_ID, EVENT_LIST_TABLE } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);


    const {
        Items
    } = await dynamodb.scan({
        TableName: EVENT_LIST_TABLE,
        FilterExpression: '#eventTypeId = :eventTypeId',
        ExpressionAttributeNames: {
            '#eventTypeId': 'eventTypeId',
        },
        ExpressionAttributeValues: {
            ':eventTypeId': EVENT_TYPE_ID,
        }
    }).promise();
    console.log(`Preparing to update ${Items.length} member records`);
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
