/* Amplify Params - DO NOT EDIT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl =
  process.env.API_PLATFORMCHESSCENTREAPP_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const listEvents = gql`
  query listEvents($startDate: String!, $endDate: String!) {
    listEvents(filter: {startDate: {between: [$startDate, $endDate]}}) {
      items {
        id
        name
        description
        time
        startDate
        endDate
        rounds
        maxEntries
        entryCount

        type {
          id
          name
          description
          url
          color
          timeControl
          eventType
          defaultPrice
        }
      }
    }
  }
`;

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async (event) => {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  // on event some query params
  const { startDate, endDate } = event.queryStringParameters;

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: print(listEvents),
    operationName: "listEvents",
    variables: {
      startDate,
      endDate
    }
  });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  try {
    const data = await new Promise((resolve, reject) => {
      const httpRequest = https.request(
        { ...req, host: endpoint },
        (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(JSON.parse(data.toString()));
          });
          response.on("error", (error) => reject(error));
        }
      );

      httpRequest.write(req.body);
      httpRequest.end();
    });

    const {
      data: {
        listEvents: { items },
      },
    } = data;

    const mapped = items.map((i) => ({
      ...i,
      name: i.name || i.type.name,
      description: i.description || i.type.description,
      time: i.time || i.type.timeControl,
      color: i.type.color,
      url: i.type.url,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(mapped),
      headers
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers
    };
  }
};
