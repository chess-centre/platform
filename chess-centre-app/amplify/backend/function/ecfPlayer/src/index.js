

const https = require('https');

exports.handler = async (event) => {

    const { id } = event.pathParameters;
    const url = `https://www.ecfrating.org.uk/v2/new/api.php?v2/players/code/${id}`;

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
    const data = await getECFPlayerInfo();
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(data),
    };
    return response;
};