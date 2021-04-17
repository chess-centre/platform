/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_ARN
	API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = process.env.API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_NAME;

const https = require("https");
const urlParse = require("url").URL;
const appsyncUrl =
  process.env.API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  const { body, headers } = event;

  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = headers["Stripe-Signature"];

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return {
        statusCode: 401,
        body: "Webhook signature verification failed.",
      };
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured,
    // retrieve the event data directly from the request body.
    const parsed = JSON.parse(body);
    data = parsed.data;
    eventType = parsed.type;
  }

  console.log(data);
  console.log(eventType);

  switch (eventType) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      try {
        await handleCheckoutSessionCompleted(data);
      } catch (error) {
        console.error(error);
      }
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
      try {
        await handleCustomerSubscriptionEvent(data);
      } catch (error) {
        console.error(error);
      }
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

async function handleCheckoutSessionCompleted(data) {
  const {
    object: { client_reference_id: id, customer, mode },
  } = data;

  if (mode === "subscription") {
    await handleCheckoutSessionCompletedSubscription(id, customer);
  } else if (mode === "payment") {
    await handleCheckoutSessionCompletedPayment(id, customer);
  }
}

async function handleCheckoutSessionCompletedSubscription(id, customer) {
  // Go ahead and set this since we know they should be considered
  // a paid member; we'll get a more specific date from subsequent
  // webhook events.
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

  const updateParams = {
    TableName: memberTable,
    Key: { id },
    UpdateExpression:
      "set stripeCustomerId = :customer, stripeCurrentPeriodEnd = :current_period_end",
    ExpressionAttributeValues: {
      ":customer": customer,
      ":current_period_end": currentPeriodEnd.getTime(),
    },
  };

  await dynamodb.update(updateParams).promise();
}

async function handleCheckoutSessionCompletedPayment(id) {
  const [memberId, eventId] = id.split("#");

  const getEvent = gql`
    query getEvent($eventId: ID!) {
      getEvent(id: $eventId) {
        entries {
          items {
            id
          }
        }
      }
    }
  `;

  const {
    data: {
      getEvent: {
        entries: { items: entries },
      },
    },
  } = await executeGraphql(getEvent, {
    eventId,
  });

  console.log(entries);

  const entryCount = entries.length + 1; // add one for this entry

  const createEntry = gql`
    mutation createEntry($eventId: ID!, $memberId: ID!, $entryCount: Int!) {
      createEntry(input: { eventId: $eventId, memberId: $memberId }) {
        id
      }
      updateEvent(input: { id: $eventId, entryCount: $entryCount }) {
        id
      }
    }
  `;

  const data = await executeGraphql(createEntry, {
    eventId,
    memberId,
    entryCount,
  });
  console.log(JSON.stringify(data));
}

async function handleCustomerSubscriptionEvent(data) {
  const {
    object: {
      current_period_end,
      customer,
      plan: { id: price, product, active },
    },
  } = data;

  if (!active) {
    console.log(
      "Ignoring customer subscription event as subscription isn't active."
    );
    return;
  }

  const queryParams = {
    TableName: memberTable,
    IndexName: "stripe",
    KeyConditionExpression: "stripeCustomerId = :customer",
    ExpressionAttributeValues: {
      ":customer": customer,
    },
  };

  const { Items } = await dynamodb.query(queryParams).promise();
  const [member] = Items;

  // This would mean we got a subscription event prior to the
  // checkout completed event. Not sure what else we could do
  // here. We'll get subsequent events that fill the gaps.
  if (!member) return;

  console.log(`Found Member with stripeCustomerId=${customer}:`);
  console.log(JSON.stringify(member));

  const { id } = member;

  const updateParams = {
    TableName: memberTable,
    Key: { id },
    UpdateExpression:
      "set stripeCurrentPeriodEnd = :current_period_end, stripePriceId = :price, stripeProductId = :product",
    ExpressionAttributeValues: {
      ":current_period_end": current_period_end * 1000,
      ":price": price,
      ":product": product,
    },
  };

  await dynamodb.update(updateParams).promise();
}

async function executeGraphql(query, variables) {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: print(query),
    variables,
  });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
      result.on("error", reject);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  return data;
}
