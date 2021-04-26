

const https = require('https');

exports.handler = async (event) => {

    const { id } = event.pathParameters;
    const date = formatDate(/* defaults to last day of previous month yyyy-mm-dd */);

    // Docs: https://www.ecfrating.org.uk/v2/help/help_api.php
    const url = `https://www.ecfrating.org.uk/v2/new/api.php?v2/players/code/${id}`;
    const ratingUrl = `https://www.ecfrating.org.uk/v2/new/api.php?v2/ratings/Standard/${id}/${date}`;

    const getECFPlayerInfo = async () => {
        console.log("GET: getECFPlayerInfo", id);
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
    const getECFPlayerRating = async () => {
        console.log("GET: getECFPlayerRating", id, date);
        return new Promise((resolve, reject) => {
            https.get(ratingUrl, response => {
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
    let error = false;
    let errorMessage = "";
    const info = await getECFPlayerInfo().catch(e => { error = true; errorMessage = e.message; });
    const rating = await getECFPlayerRating().catch(e => { error = true; errorMessage = e.message; });;

    const data = {
        info,
        rating
    };
    console.log(data);

    if(!error) {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(data),
        };
        return response;
    } else {
        const response = {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({ error: errorMessage })
        };
        return response;
    };
};

function formatDate() {
    const today = new Date();
    const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const format = lastDayOfPreviousMonth.toISOString()
    return format.slice(0, 10);;
  }