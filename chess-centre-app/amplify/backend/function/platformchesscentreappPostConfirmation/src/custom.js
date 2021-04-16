const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = `Member-${process.env.GRAPHQLID}-${process.env.ENV}`;

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  const {
    request: {
      userAttributes: { sub, given_name, family_name, email },
    },
  } = event;

  const timestamp = new Date().toISOString();
  const params = {
    TableName: memberTable,
    Item: {
      id: sub,
      __typename: "Member",
      _lastChangedAt: Date.now(),
      _version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      username: `${given_name.toLowerCase()}-${family_name.toLowerCase()}`,
      email,
      promoByEmail: false,
      promoByText: false,
      eventsByEmail: false,
      eventsByText: false,
    },
  };

  const response = await dynamodb.put(params).promise();
  console.log(response);

  callback(null, event);
};
