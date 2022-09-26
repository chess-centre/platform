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
const gql = require("graphql-tag");
const graphql = require("graphql");
const https = require("https");
const urlParse = require("url").URL;
const sendMembershipEmailInternal = require("./sendEmail").sendMembershipEmailInternal;
const sendMembershipEmailToMember = require("./sendEmail").sendMembershipEmailToMember;
const sendRegisteredEventEmailToMember = require("./sendEmail").sendRegisteredEventEmailToMember;
const sendRegisteredEventEmailInternal = require("./sendEmail").sendRegisteredEventEmailInternal;
const sendRegisteredEventEmailToMemberJuniorCustom = require("./sendEmail").sendRegisteredEventEmailToMemberJuniorCustom;
const sendRegisteredEventEmailToMemberFestival = require("./sendEmail").sendRegisteredEventEmailToMemberFestival;

const dynamodb = new AWS.DynamoDB.DocumentClient();
const region = process.env.REGION;
const appsyncUrl = process.env.API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT;
const memberTable = process.env.API_PLATFORMCHESSCENTREAPP_MEMBERTABLE_NAME;
const planTable = process.env.API_PLATFORMCHESSCENTREAPP_PLANTABLE_NAME;
const endpoint = new urlParse(appsyncUrl).hostname.toString();



const { print } = graphql;

const getEvent = gql`
  query getEvent($id: ID!, $memberId: ID!, $filter: ModelEntryFilterInput, $limit: Int, $nextToken: String) {
    getEvent(id: $id) {
      id
      maxEntries
      entryCount
      type {
        id
        name
        maxEntries
        stripePriceId
        eventType
        time
      }
      endDate
      startDate
      _version
    }
    getMember(id: $memberId) {
      id
      name
      email
      stripeCustomerId
      stripeCurrentPeriodEnd
    }
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        memberId
        section
        byes
        createdAt
        updatedAt
        member {
          id
          fideId
          ecfId
          name
          ecfRatingPartial
          ecfRating
          ecfRapidPartial
          ecfRapid
          ecfMembership
          estimatedRating
          club
          gender
          membershipType
          chessTitle
        }
      }
      nextToken
      startedAt
    }
  }
`;

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  console.log(process.env.STRIPE_API_KEY);

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
    object: { client_reference_id: id, customer, mode,  amount_total: price, customer_email: stripeEmail },
  } = data;

  console.log("handleCheckoutSessionCompleted", data);

  if (mode === "subscription") {
    await handleCheckoutSessionCompletedSubscription(id, customer, price, stripeEmail);
  } else if (mode === "payment") {
    await handleCheckoutSessionCompletedPayment(id, customer);
  }
}

async function handleCheckoutSessionCompletedSubscription(id, customer, price, stripeEmail) {

  const [memberId,] = id.split("#");

  const getMember = gql`
    query getMember($memberId: ID!) {
      getMember(id: $memberId) {
        id
        name
        email
        stripeFriendlyProductName
      }
    }
  `;

  const {
    data: {
      getMember: { email, name, stripeFriendlyProductName },
    },
  } = await executeGraphql(getMember, {
    memberId
  });
  
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

  const emailParams = {
    name,
    email,
    stripeEmail,
    price,
    stripeFriendlyProductName
  };

  console.log("Email params passed", emailParams);

  await sendMembershipEmailToMember(emailParams);
  await sendMembershipEmailInternal(emailParams);
}

async function handleCheckoutSessionCompletedPayment(id) {
  const [memberId, eventId, section, byes] = id.split("#");
  
  console.log("memberId", memberId, "eventId", eventId, "section", section, "byes", byes);

  let entryList = [];

  const {
    data: {
      getEvent: {
        startDate,
        endDate,
        arrivalTime,
        type: { name: eventName, eventType },
        _version,
      },
      getMember: { email, name },
      listEntrys: { items: entries, nextToken }
    },
  } = await fetchEvent(eventId, memberId);


  entryList = [...entries];

  if(nextToken) {
    const { data: { listEntrys: { items: nextEntries }}} = await fetchEvent(eventId, memberId, nextToken);
    entryList = [...entryList, ...nextEntries];
  }

  const entryCount = entryList.length + 1; // add one for this entry

  const createEntry = gql`
    mutation createEntry(
      $eventId: ID!
      $memberId: ID!
      $section: String,
      $byes: String,
      $entryCount: Int!
      $_version: Int!
    ) {
      createEntry(input: { eventId: $eventId, memberId: $memberId, section: $section, byes: $byes }) {
        id
      }
      updateEvent(
        input: { id: $eventId, entryCount: $entryCount, _version: $_version }
      ) {
        id
      }
    }
  `;

  const data = await executeGraphql(createEntry, {
    eventId,
    memberId,
    section,
    byes,
    entryCount,
    _version,
  });
  console.log(JSON.stringify(data));

  const params = {
    eventId,
    email,
    arrivalTime,
    name,
    eventName,
    startDate,
    endDate,
    eventType,
    entries: entryList,
    section,
    byes
  };

  console.log("Params", params);

  // TODO: As "eventType" is not a reliable means to idenify this bespoke event. Refactor required to support multiple location types.
  if(eventName.includes("IGS Junior")) {
    await sendRegisteredEventEmailToMemberJuniorCustom(params).catch(err => console.log("sendRegisteredEventEmailToMemberJunior", err));
  } else if (eventName.includes("Ilkley Chess Festival")) {
    await sendRegisteredEventEmailToMemberFestival(params).catch(err => console.log("sendRegisteredEventEmailToMemberFestival", err));
  } else {
    await sendRegisteredEventEmailToMember(params).catch(err => console.log("sendRegisteredEventEmailToMember", err));
  }

  await sendRegisteredEventEmailInternal(params).catch(err => console.log("sendRegisteredEventEmailInternal", err));
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
  
  // TODO: should be a query by 1 item, not a scan:
  const {
    Items: plans
  } = await dynamodb.scan({
      TableName: planTable
  }).promise();

  if(!plans) return;

  const { key } = plans.find(p => p.stripeProductId === product);
  console.log(`Found plan name, bespokely called stripeFriendlyProductName=${key}:`);

  const updateParams = {
    TableName: memberTable,
    Key: { id },
    UpdateExpression:
      "set stripeCurrentPeriodEnd = :current_period_end, stripePriceId = :price, stripeProductId = :product, stripeFriendlyProductName = :planName",
    ExpressionAttributeValues: {
      ":current_period_end": current_period_end * 1000,
      ":price": price,
      ":product": product,
      ":planName": key
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
    const httpRequest = https.request({ ...req, host: endpoint }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        resolve(JSON.parse(data.toString()));
      });
      response.on("error", reject);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
  return data;
}

async function fetchEvent(id, memberId, nextToken) {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  const variables = {
    id,
    memberId,
    limit: 250,
    filter: { eventId: { eq: id }},
    nextToken: nextToken
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: print(getEvent),
    operationName: "getEvent",
    variables,
  });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk; 
      });
      response.on("end", () => {
        resolve(JSON.parse(data.toString()));
      });
      response.on("error", reject);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  console.log(JSON.stringify(data));
  return data;
}