const https = require("https");
const AWS = require("aws-sdk");
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
    const { eventId, section, byes } = JSON.parse(body);

    console.log(`eventId: ${eventId}, memberId: ${memberId}`);

    const eventData = await fetchEvent(eventId, memberId);
    console.log(JSON.stringify(eventData));

    const {
        data: {
            getEvent: {
                maxEntries,
                type: { maxEntries: defaultMaxEntries },
                entries: { items: entries },
            },
            getMember: { stripeCustomerId, stripeCurrentPeriodEnd },
        },
    } = eventData;

    if (stripeCustomerId && (new Date(stripeCurrentPeriodEnd) > new Date(Date.now()))) {
        console.log("Active member confirmed. Valid until", new Date(stripeCurrentPeriodEnd));
    } else {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify("This is not an active member."),
        };
    }

    const actualMaxEntries = maxEntries || defaultMaxEntries;
    const entryCount = entries.length;
    if (entryCount >= actualMaxEntries) {
        console.log("This event is full");
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify("This event is full."),
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
        entryCount: entryCount + 1,
        _version,
    });
    console.log(JSON.stringify(data));


    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
        }),
    };

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
