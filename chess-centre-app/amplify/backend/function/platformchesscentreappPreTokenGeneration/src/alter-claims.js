const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = `Member-${process.env.GRAPHQLID}-${process.env.ENV}`;

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  const {
    request: {
      userAttributes: { sub },
      groupConfiguration: { groupsToOverride },
    },
  } = event;

  const groups = [...groupsToOverride];

  event.response = {
    claimsOverrideDetails: {
      groupOverrideDetails: {
        groupsToOverride: groups,
      },
    },
  };

  const params = {
    TableName: memberTable,
    Key: {
      id: sub,
    },
  };

  const response = await dynamodb.get(params).promise();
  if (!response) {
    console.warn(`Couldn't find user with sub=${sub}`);
    // Return to Amazon Cognito
    callback(null, event);
    return;
  }

  const member = response.Item;
  console.log(JSON.stringify(member));

  const { stripeCurrentPeriodEnd } = member || {};
  const activeThrough = stripeCurrentPeriodEnd
    ? new Date(stripeCurrentPeriodEnd)
    : undefined;

  console.log(activeThrough);
  console.log(new Date());

  if (activeThrough && activeThrough > new Date()) {
    console.log(`Member is active through ${activeThrough.toISOString()}`);
    console.log("Adding Member group claim for active Member");
    groups.push("Member");
  }
  // Return to Amazon Cognito
  callback(null, event);
};
