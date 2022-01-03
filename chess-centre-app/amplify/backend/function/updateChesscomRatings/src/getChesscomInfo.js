const axios = require('axios');

exports.getChesscomInfo = async handle => {
  console.log("GET: getChesscomInfo", handle);

  // Docs: https://www.chess.com/news/view/published-data-api
  const fetch = async (url) => {
    const response = axios.get(url);
    return response.data
  };

  const stats = `https://api.chess.com/pub/player/${handle.toLowerCase()}/stats`;
  const info = `https://api.chess.com/pub/player/${handle.toLowerCase()}`;
  
  const statsResponse = await fetch(stats).catch(e => {
      console.log("error", e);
  });

  const infoResponse = await fetch(info).catch(e => {
      console.log("error", e);
  });


  if(statsResponse && infoResponse) {
    return {
        ...statsResponse,
        ...infoResponse
      };
  } else {
      return { error: "No data" }
  }
};