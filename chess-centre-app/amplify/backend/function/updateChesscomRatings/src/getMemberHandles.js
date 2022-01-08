const AWS = require("aws-sdk");
const { MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.getMemberHandles = async () => {

    const {
      Items: members
    } = await dynamodb.scan({
        TableName: MEMBERTABLE_NAME,
        FilterExpression: "attribute_exists(chesscomUsername)"
    }).promise();

    return members;
}