const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_EVENT_TABLE_NAME, API_EVENT_TYPE_TABLE_NAME } = process.env;

exports.getLatestEvents = async () => {

  const eventTypes = await dynamodb.scan({
    TableName: API_EVENT_TYPE_TABLE_NAME,
    ProjectionExpression: "#id, #eventName, description, timeControl, eventType, maxEntries, #eventTime",
    ExpressionAttributeNames: {
      "#eventName": "name",
      "#eventTime": "time",
      "#id": "id"
    }
  }).promise();

  const items = await dynamodb.query({ 
    TableName: API_EVENT_TABLE_NAME, 
    IndexName: "eventsByActive",
    KeyConditionExpression: "#active = :active and #startDate >= :dateStr",
    ProjectionExpression: "#id, #eventName, description, rounds, #eventTime, #eventType, eventTypeId, startDate, endDate, isLive, isLiveUrl, complete, cancelled, entryCount, maxEntries",
    ExpressionAttributeNames: {
      "#id": "id",
      "#eventName": "name",
      "#eventTime": "time",
      "#eventType": "type",
      "#startDate": "startDate",
      "#active": "active"
    },
    ExpressionAttributeValues: { ":dateStr": new Date().toISOString() , ":active":"yes"},
  }).promise();

  return items?.Items?.reduce((events, item) => {
    const eventType = eventTypes?.Items?.find(({id}) => id === item.eventTypeId);
    const currentEvent = {
      // merge eventTypes with event information:
      ...eventType,
      ...item
    };
    return [...events, currentEvent];
  }, []);
};

exports.getEvent = async (id) => {

  try {
    const item = await dynamodb.get({ 
      TableName: API_EVENT_TABLE_NAME,
      ProjectionExpression: "#id, #eventName, description, rounds, #eventTime, #eventType, startDate, endDate, isLive, isLiveUrl, complete, cancelled, entryCount, maxEntries",
      ExpressionAttributeNames: {
        "#id": "id",
        "#eventName": "name",
        "#eventTime": "time",
        "#eventType": "type"
      },
      Key: { id: id }
    }).promise();
    
    let eventType = { Item: {}};
    
    if(item && item.eventTypeId) {
      eventType = await dynamodb.get({
        TableName: API_EVENT_TYPE_TABLE_NAME,
        ProjectionExpression: "#eventName, description, timeControl, eventType, maxEntries, #eventTime",
        ExpressionAttributeNames: {
          "#eventName": "name",
          "#eventTime": "time",
        },
        Key: { id: item.event }
      }).promise();
    }
  
    const currentEvent = {
      // merge eventTypes with event information:
      ...eventType.Item,
      ...item.Item
    };
    return currentEvent;
    
  } catch (error) {
    console.log(error);
    return {};
  }
};
