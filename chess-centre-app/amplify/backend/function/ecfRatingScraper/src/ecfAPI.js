const https = require('https');
const ROOT = "https://www.ecfrating.org.uk/v2/new/api.php?v2";

/**
 * Example APIs
 * Info   ---> /players/code/225527
 * Rating ---> /ratings/R/225527/2021-08-01
 * Games  ---> /games/Rapid/player/120787/limit/100
 */

exports.fetchInfo = async (id) => {
  const url = `${ROOT}/players/code/${id}`;
  const data = await fetchData(url);
  return data;
};

exports.fetchRating = async (id, type = "S") => {
  const date = formatDate();
  const url = `${ROOT}/ratings/${type}/${id}/${date}`;
  const data = await fetchData(url);
  return data;
};

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

const formatDate = () => {
  const today = new Date();
  const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const format = lastDayOfPreviousMonth.toISOString();
  return format.slice(0, 10);
};