/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	API_PLATFORMCHESSCENTREAPP_PLANTABLE_ARN
	API_PLATFORMCHESSCENTREAPP_PLANTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const planTable = process.env.API_PLATFORMCHESSCENTREAPP_PLANTABLE_NAME;

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
  const [userSub] = identity.cognitoAuthenticationProvider.split(":").slice(-1);
  const { plan, successUrl, cancelUrl, email } = JSON.parse(body);

  if (!plan || !successUrl || !cancelUrl) {
    return {
      statusCode: 400,
      headers,
      body: "Invalid request body",
    };
  }

  const queryParams = {
    TableName: planTable,
    IndexName: "key",
    KeyConditionExpression: "#key = :plan",
    ExpressionAttributeNames: {
      "#key": "key",
    },
    ExpressionAttributeValues: {
      ":plan": plan,
    },
  };

  const { Items } = await dynamodb.query(queryParams).promise();
  const [planRecord] = Items;

  if (!planRecord) {
    console.warn(`Couldn't find plan with id=${plan}`);
    return {
      statusCode: 400,
      headers,
      body: "No plan record found.",
    };
  }

  console.log(JSON.stringify(planRecord));

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planRecord.stripePriceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&subscription_payment_success=true`,
      cancel_url: cancelUrl,
      client_reference_id: userSub,
      customer_email: email,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
      }),
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
