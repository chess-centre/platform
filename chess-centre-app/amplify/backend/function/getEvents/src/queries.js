const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_EVENT_TABLE_NAME } = process.env;

exports.getLatestEvents = async () => {

  const items = await dynamodb.query({ 
    TableName: API_EVENT_TABLE_NAME, 
    IndexName: "eventsByActive",
    KeyConditionExpression: "#active = :active and #startDate >= :dateStr",
    ExpressionAttributeNames: {
      "#startDate": "startDate",
      "#active": "active"
    },
    ExpressionAttributeValues: { ":dateStr": new Date().toISOString() , ":active":"yes"},
  }).promise();

  return items?.Items?.reduce((events, item) => {
    return [...events, {
      id: item.id,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      eventTypeId: item.eventTypeId,
      rounds: item.rounds,
      entryCount: item.entryCount,
      maxEntries: item.maxEntries,
      complete: item.complete,
      updatedAt: item.updatedAt,
      isLive: item.isLive,
      cancelled: item.cancelled
    }];
  }, []);
}

