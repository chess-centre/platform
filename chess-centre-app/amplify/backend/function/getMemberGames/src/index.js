/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GAMETABLE_ARN
	API_PLATFORMCHESSCENTREAPP_GAMETABLE_NAME
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const gamesTable = process.env.API_PLATFORMCHESSCENTREAPP_GAMETABLE_NAME;

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  const {
    source: { id },
  } = event;

  const params = {
    TableName: gamesTable,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeValues: {
      ":id": id,
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
  ] = await Promise.all(
    dynamodb.query(whiteParams).promise(),
    dynamodb.query(blackParams).promise()
  );

  return {
    statusCode: 200,
    body: JSON.stringify([...asWhitePlayer, ...asBlackPlayer]),
  };
};
