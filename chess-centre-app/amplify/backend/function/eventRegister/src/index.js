/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const https = require("https");
const AWS = require("aws-sdk");
const region = process.env.REGION;
const SES = new AWS.SES({ region: region });
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
  const { eventId, successUrl, cancelUrl } = JSON.parse(body);

  console.log(`eventId: ${eventId}, memberId: ${memberId}`);
  
  const eventData = await fetchEvent(eventId, memberId);
  console.log(JSON.stringify(eventData));

  const {
    data: {
      getEvent: {
        maxEntries,
        startDate,
        type: {
          time
        },
        eventType,
        type: { stripePriceId, maxEntries: defaultMaxEntries, name: eventName },
        entries: { items: entries },
      },
      getMember: { stripeCustomerId, email, name },
    },
  } = eventData;

  const actualMaxEntries = maxEntries || defaultMaxEntries;
  const entryCount = entries.length;
  if (entryCount >= actualMaxEntries) {
    return {
      statusCode: 400,
      headers,
      body: "This event is full.",
    };
  }

  const existingEntry = entries.find((e) => e.memberId === memberId);
  if (existingEntry) {
    return {
      statusCode: 400,
      headers,
      body: "This member is already registered for this event.",
    };
  }

  if(!stripeCustomerId) {
    console.log("stripeCustomerId does not exist for this user.");
  }

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
      client_reference_id: `${memberId}#${eventId}`,
      customer: stripeCustomerId || undefined,
    });

    console.log("stripe session:");
    console.log(session);

    console.log("Sending registered email", email);

    const params = {
      eventId,
      email,
      time,
      name,
      eventName,
      startDate,
      eventType
    };

    const emailData = await sendRegisteredEventEmail(params).catch(e => {
      console.log("sendRegisteredEventEmail error");
      console.log(e);
    });

    console.log(emailData);

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

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

async function sendRegisteredEventEmail({ email, time, name, eventName, eventType, eventId, startDate }) {
  const params = {
    Source: "The Chess Centre <support@chesscentre.online>",
    Destination: {
      BccAddresses: [
        "The Chess Centre <support@chesscentre.online>"
      ],
      ToAddresses: ["matt@chesscentre.online"],
    },
    Message: {
      Subject: { Data: `${eventName} | Entry Confirmed` },
      Body: {
        Text: { Data: `Hi ${name},\r\n Thank you for registering for our ${eventName} on ${startDate}.` },
        Html: { Data: `<h2 style="color: #047481">♟️ The Chess Centre</h2>
        <p>Hello ${name} 👋</p>
        <p>Thank you for registering for our <strong>${eventName}</strong>.</p> 
        <p>The key details for this event:</p>
        <p>📅 Date: ${formatDate(startDate)}</p>
        ${time ? `<p>⌚ Arrival Time:" ${time}</p>` : ""}
        <p>🏠 Our location: <span style="color: #047481">Unit 8, Crescent Court, Ilkley, LS29 8DE</span></p>
        <p>More details can be found here:
          <a href="https://www.chesscentre.online/${eventType}/${eventId}">chesscentre.online/${eventType}</a>
        </p>
        <p>If you have any questions or need to withdraw your entry, please email us at: info@chesscentre.online</p>
        <p>We look forward to seeing you soon! 🚀</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

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
