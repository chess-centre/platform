const AWS = require("aws-sdk");
const sendNewAccountEmail = require("./sendEmail").sendNewAccountEmail;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = `Member-${process.env.GRAPHQLID}-${process.env.ENV}`;

exports.handler = async (event, context, callback) => {

  const data = JSON.stringify(event);
  console.log(data);

  const {
    request: {
      userAttributes: { sub, given_name, family_name, email },
    },
  } = event;

  const name = `${given_name} ${family_name}`;

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
      name,
      email,
      promoByEmail: false,
      promoByText: false,
      eventsByEmail: false,
      eventsByText: false,
    },
  };

  try {
    const response = await dynamodb.put(params).promise();
    console.log(response);

    if(data.triggerSource === "PostConfirmation_ConfirmSignUp") {
      await sendNewAccountEmail(data.request.userAttributes);
      console.log("Email sent.")
    };
  } catch (error) {
    console.log("error", error);
  }

  callback(null, event);
};
