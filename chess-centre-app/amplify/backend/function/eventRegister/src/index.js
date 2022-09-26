/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const https = require("https");
const AWS = require("aws-sdk");
const sendRegisteredEventEmailToMember = require("./sendEmail").sendRegisteredEventEmailToMember;
const sendRegisteredEventEmailInternal = require("./sendEmail").sendRegisteredEventEmailInternal;
const region = process.env.REGION;
const urlParse = require("url").URL;
const appsyncUrl =
  process.env.API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getEvent = gql`
  query getEvent($id: ID!, $memberId: ID!) {
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
        memberEntry
      }
      endDate
      startDate
      _version
      entries {
        items {
          id
          eventId
          memberId
        }
      }
    }
    getMember(id: $memberId) {
      id
      name
      email
      stripeCustomerId
      stripeCurrentPeriodEnd
    }
  }
`;


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
  const [memberId] = identity.cognitoAuthenticationProvider
    .split(":")
    .slice(-1);
    const { eventId, successUrl, cancelUrl, section, byes } = JSON.parse(body);

  console.log(`eventId: ${eventId}, memberId: ${memberId}`);
  
  const eventData = await fetchEvent(eventId, memberId);
  console.log(JSON.stringify(eventData));

  const {
    data: {
      getEvent: {
        maxEntries,
        arrivalTime,
        startDate,
        endDate,
        _version,
        type: { name: eventName, eventType, stripePriceId, maxEntries: defaultMaxEntries, memberEntry },
        entries: { items: entries }
      },
      getMember: { 
        stripeCustomerId, 
        stripeCurrentPeriodEnd,
        email,
        name
      },
    },
  } = eventData;

  const actualMaxEntries = maxEntries || defaultMaxEntries;
  const entryCount = entries.length || 0;
  if (entryCount >= actualMaxEntries) {
    console.log("This event is full");
    return {
      statusCode: 400,
      headers,
      body:  JSON.stringify("This event is full."),
    };
  }

  const existingEntry = entries.find((e) => e.memberId === memberId);
  if (existingEntry) {
    console.log("This member is already registered for this event.");
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify("This member is already registered for this event."),
    };
  }

  if(!stripeCustomerId) {
    console.log("stripeCustomerId does not exist for this user.");
  }

  let activeMember = false;

  if(stripeCustomerId && new Date(stripeCurrentPeriodEnd) > Date.now()) {
    activeMember = true;

    const params = {
      eventId,
      email,
      arrivalTime,
      name,
      eventName,
      startDate,
      endDate,
      eventType,
      entries,
      section,
      byes
    };

    console.log("entryCount", entryCount + 1);
    await createMemberEntry({ memberId, eventId, section, byes, entryCount: entryCount + 1, _version });

    await sendRegisteredEventEmailToMember(params).catch(e => console.log("Email Member Error", e));
    await sendRegisteredEventEmailInternal(params).catch(e => console.log("Email Admin Error", e));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: null,
        active: activeMember,
        memberEntry
      }),
    };

  } else {

    // See https://stripe.com/docs/api/checkout/sessions/create
    // for additional parameters to pass.
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price: stripePriceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&event_payment_success=true`,
        cancel_url: cancelUrl,
        client_reference_id: `${memberId}#${eventId}#${section}#${byes}`,
        customer: stripeCustomerId || undefined,
      });
  
      console.log('Session', session);
  
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          sessionId: session.id,
          active: activeMember,
          memberEntry
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
  }
};


async function fetchEvent(id, memberId) {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  const variables = {
    id,
    memberId,
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

async function createMemberEntry({ eventId, memberId, section, byes, entryCount, _version }) {

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
    _version
  });
  console.log(JSON.stringify(data));
  return data;
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
