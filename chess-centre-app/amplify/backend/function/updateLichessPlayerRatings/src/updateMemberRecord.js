const AWS = require("aws-sdk");
const { MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.updateMemberRecord = async (id, data) => {
  const params = {
    TableName: MEMBERTABLE_NAME,
    Key: {
        id
    },
    UpdateExpression: "set liChessInfo=:json, lichessLastUpdated=:updated",
    ExpressionAttributeValues: {
        ":json": data,
        ":updated": Date.now()
    },
    ReturnValues: "UPDATED_NEW"
  };
  return await dynamodb.update(params).promise();
};