

const https = require('https');

exports.handler = async (event) => {

    const { id, type } = event.pathParameters;
    // type: "Standard" | "Rapid"
    // id: ecf player id (minus alpha char on the end)

    // Docs: https://www.ecfrating.org.uk/v2/help/help_api.php
    const url = `https://www.ecfrating.org.uk/v2/new/api.php?v2/games/${type}/player/${id}/limit/100`

    const getECFPlayerGameInfo = async () => {
        console.log("GET: getECFPlayerGameInfo", id);
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

    let error = false;
    let errorMessage = "";
    const games = await getECFPlayerGameInfo().catch(e => { error = true; errorMessage = e.message; });

    const data = {
        games
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
