/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_ARN
	API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = process.env.API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_NAME;
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  console.log(process.env.STRIPE_API_KEY);

  const {
    body,
    requestContext: { identity },
  } = event;

  if (!identity || !identity.cognitoAuthenticationProvider) {
    return {
      statusCode: 401,
      headers,
      body: "Unauthorized",
    };
  }

  // cognitoAuthenticationProvider looks like
  // "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_dbFaqW6eN,cognito-idp.eu-west-1.amazonaws.com/eu-west-1_dbFaqW6eN:CognitoSignIn:c4bd1329-5b2c-4cab-929f-561f0d8ec018"
  const [sub] = identity.cognitoAuthenticationProvider.split(":").slice(-1);
  const { returnUrl } = JSON.parse(body);

  const params = {
    TableName: memberTable,
    Key: {
      id: sub,
    },
  };

  const response = await dynamodb.get(params).promise();
  if (!response) {
    console.warn(`Couldn't find user with sub=${sub}`);
    return {
      statusCode: 400,
      headers,
      body: "No member record found for this account.",
    };
  }

  const member = response.Item;
  console.log(JSON.stringify(member));

  const { stripeCustomerId } = member;
  if (!stripeCustomerId) {
    console.log("This isn't a paid memeber account.");
    return {
      statusCode: 400,
      headers,
      body: "This isn't a paid member account.",
    };
  }

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(e),
    };
  }
};
