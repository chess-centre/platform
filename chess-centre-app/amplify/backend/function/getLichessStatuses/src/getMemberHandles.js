const AWS = require("aws-sdk");
const { MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.getMemberHandles = async () => {

    const params = {
      TableName: MEMBERTABLE_NAME,
      IndexName: "liChessUsername-index",
      AttributesToGet: ["liChessUsername"],
    };
  
    const { Items: members } = await dynamodb.scan(params).promise();

    return members;
};