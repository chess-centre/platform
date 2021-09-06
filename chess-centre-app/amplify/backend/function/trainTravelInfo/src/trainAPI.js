const https = require('https');
const { TRAVEL_APP_ID, TRAVEL_APP_KEY } = process.env;

const getURL = (station="ILK", date, time) => {
    const host = "https://transportapi.com";
    return `${host}/v3/uk/train/station/${station}/${date}/${time}/timetable.json?app_id=${TRAVEL_APP_ID}&app_key=${TRAVEL_APP_KEY}&train_status=passenger`
}

const fetch = (url) => {
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
}

exports.getTrainInfo = async (station, date, time) => {
  const url = getURL(station, date, time);
  const response = await fetch(url);
  return response;
};