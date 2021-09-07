
const AWS = require("aws-sdk");
const { API_GAMETABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.getGameInfo = async (memberId) => {

  const params = {
    TableName: API_GAMETABLE_NAME,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeValues: {
      ":id": memberId,
    },
  };

  const whiteParams = {
    ...params,
    IndexName: "byWhite",
    ExpressionAttributeNames: {
      "#id": "whiteMemberId",
    },
  };

  const blackParams = {
    ...params,
    IndexName: "byBlack",
    ExpressionAttributeNames: {
      "#id": "blackMemberId",
    },
  };

  const [
    { Items: asWhitePlayer },
    { Items: asBlackPlayer },
  ] = await Promise.all([
    dynamodb.query(whiteParams).promise(),
    dynamodb.query(blackParams).promise(),
  ]);

  return [...asWhitePlayer, ...asBlackPlayer];


} 