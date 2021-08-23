const https = require('https');
const ROOT = "https://www.ecfrating.org.uk/v2/new/api.php?v2";

/**
 * Example API
 * fetchPotentailInfo ---> /players/fuzzy_name/matthew%20webb
 */

exports.fetchPotentialInfo = async (name) => {
  const url = `${ROOT}/players/fuzzy_name/${name}`;
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