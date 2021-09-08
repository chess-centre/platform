const AWS = require("aws-sdk");
const { API_GAMETABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.getGameInfo = async (memberId) => {

  const params = {
    TableName: API_GAMETABLE_NAME,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeValues: {
      ":id": memberId,
    },
  };

  const whiteParams = {
    ...params,
    IndexName: "byWhite",
    ExpressionAttributeNames: {
      "#id": "whiteMemberId",
    },
  };

  const blackParams = {
    ...params,
    IndexName: "byBlack",
    ExpressionAttributeNames: {
      "#id": "blackMemberId",
    },
  };

  const [
    { Items: asWhitePlayer },
    { Items: asBlackPlayer },
  ] = await Promise.all([
    dynamodb.query(whiteParams).promise(),
    dynamodb.query(blackParams).promise(),
  ]);

  return prepareGameData([...asWhitePlayer, ...asBlackPlayer]);
};

function prepareGameData(games) {
  // This structures the data so I can be passed to the users dashboard:
  return games.reduce((prev, { date, type }) => {
    const month = date ? new Date(date).toLocaleString('default', { month: 'long' }) : '';
    const exists = prev.find(g => g.month === month);
    if (exists) {
      const index = prev.findIndex(g => g.month === month);
      prev[index][type] ? prev[index][type] += 1 : prev[index][type] = 1;
      return [...prev];
    } else {
      return [...prev, {
        month,
        [type]: 1
      }];
    }
  }, []);
}