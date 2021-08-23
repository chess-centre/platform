<<<<<<< HEAD
const AWS = require("aws-sdk");
const sendNewAccountEmail = require("./sendEmail").sendNewAccountEmail;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = `Member-${process.env.GRAPHQLID}-${process.env.ENV}`;

exports.handler = async (event, context, callback) => {

  console.log(JSON.stringify(event));

  const {
    triggerSource,
    request: { userAttributes },
  } = event;
  const { sub, given_name, family_name, email } = userAttributes

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

    if(triggerSource === "PostConfirmation_ConfirmSignUp") {
      await sendNewAccountEmail(userAttributes);
      console.log("Email sent.")
    };
  } catch (error) {
    console.log("error", error);
  }

  callback(null, event);
=======
const AWS = require("aws-sdk");
const sendNewAccountEmail = require("./sendEmail").sendNewAccountEmail;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = `Member-${process.env.GRAPHQLID}-${process.env.ENV}`;

exports.handler = async (event, context, callback) => {

  console.log(JSON.stringify(event));

  const {
    triggerSource,
    request: { userAttributes },
  } = event;
  const { sub, given_name, family_name, email } = userAttributes

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

    if(triggerSource === "PostConfirmation_ConfirmSignUp") {
      await sendNewAccountEmail(userAttributes);
      console.log("Email sent.")
    };
  } catch (error) {
    console.log("error", error);
  }

  callback(null, event);
>>>>>>> a127af3b37430cc6d54adeedea3f19a11a297167
};