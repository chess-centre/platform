const https = require('https');
const ROOT = "https://www.ecfrating.org.uk/v2/new/api.php?v2";

/**
 * Example APIs
 * Games  ---> /games/Rapid/player/225527D/limit/100
 */

exports.fetchGames = async (id, type = "Standard", limit = 100) => {
  const url = `${ROOT}/games/${type}/player/${id}/limit/${limit}`;
  const data = await fetchData(url);
  return data;
};

const fetchData = (url) => {
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