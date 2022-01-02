const https = require('https');

exports.getLichessInfo = async handle => {
  console.log("GET: getLiChessInfo", handle);
  const url = `https://lichess.org/api/user/${handle}`;

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