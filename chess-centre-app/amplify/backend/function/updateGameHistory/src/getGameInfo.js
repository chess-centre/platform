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

  const games = [...asWhitePlayer, ...asBlackPlayer];
  const history = genGameHistory(games);
  const stats = genGameStats(asWhitePlayer, asBlackPlayer);
  const formStats = getFormStats(memberId, games);
            
  return {
    stats,
    history,
    formStats
  };
};

function genGameHistory(games) {
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

function getFormStats(memberId, games) {
    return games.sort((a, b) => {
      if(a.eventId === b.eventId) {
        return b.round - a.round;
      }
      return new Date(a.date) - new Date(b.date);
    }).reduce((pre, cur) => {
      if(cur.whiteMemberId === memberId) {
        if(cur.result === "1-0") pre.push(1);
        if(cur.result === "0.5-0.5") pre.push(0.5);
        if(cur.result === "0-1") pre.push(0);
      }
      if(cur.blackMemberId === memberId) {
        if(cur.result === "0-1") pre.push(1);
        if(cur.result === "0.5-0.5") pre.push(0.5);
        if(cur.result === "1-0") pre.push(0);
      }
      return [...pre];
    }, []);
}

function genGameStats(whiteGames, blackGames) {

  const whiteStats = whiteGames.reduce((prev, game) => {
    switch (game.result) {
      case "1-0":
        prev.wins += 1;
        prev.whiteWins += 1;
        return prev;
      case "0.5-0.5":
        prev.draws += 1;
        return prev;
      case "0-1":
        prev.losses += 1;
        return prev;
      default:
        return prev;
    }
  }, {
    wins: 0,
    losses: 0,
    draws: 0,
    whiteWins: 0,
    blackWins: 0
  });

  const blackStats = blackGames.reduce((prev, game) => {
    switch (game.result) {
      case "1-0":
        prev.losses += 1;
        return prev;
      case "0.5-0.5":
        prev.draws += 1;
        return prev;
      case "0-1":
        prev.wins += 1;
        prev.blackWins += 1;
        return prev;
      default:
        return prev;
    }
  }, {
    wins: 0,
    losses: 0,
    draws: 0,
    whiteWins: 0,
    blackWins: 0
  });

  const totalStats = {};

  for(let prop in whiteStats) {
    totalStats[prop] = whiteStats[prop] + blackStats[prop];
  }

  return totalStats;
}