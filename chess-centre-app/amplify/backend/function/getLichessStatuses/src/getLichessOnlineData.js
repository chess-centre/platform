const https = require('https');

exports.getLichessOnlineData = async query => {
  console.log("GET: getLichessOnlineData", query);
  const url = `https://lichess.org/api/users/status?ids=${query}`;
  
  console.log(url);

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