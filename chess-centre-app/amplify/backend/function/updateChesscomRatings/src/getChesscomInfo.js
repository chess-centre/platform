const https = require('https');

exports.getChesscomInfo = async handle => {
  console.log("GET: getChesscomInfo", handle);

  // Docs: https://www.chess.com/news/view/published-data-api
  const fetch = async (url) => { 
      console.log("URL:", url);
      return new Promise((resolve, reject) => {
          https.get(url, response => {
              let data = "";
              response.on("data", chunk => {
                  data += chunk;
              });
              response.on("end", () => {
                  resolve(data);
              });
              response.on("error", (e) => {
                  reject("error", e);
              });
          });
      });
  };

  const info = `https://api.chess.com/pub/player/${handle.toLowerCase()}`;
  const stats = `https://api.chess.com/pub/player/${handle.toLowerCase()}/stats`;

  const statsResponse = await fetch(stats).catch(e => {
      console.log("error", e);
  });

  const infoResponse = await fetch(info).catch(e => {
      console.log("error", e);
  });

  let parsedStats = null;
  let parsedInfo = null;

  try {
      parsedStats = JSON.parse(statsResponse);
      parsedInfo = JSON.parse(infoResponse);
      return {
        ...parsedInfo,
        ...parsedStats
      };
  } catch (error) {
      console.log(error);
      return { error: "Error parsing response data" };
  }
};