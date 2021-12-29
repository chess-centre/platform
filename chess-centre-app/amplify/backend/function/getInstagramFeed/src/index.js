const https = require('https');
const { API_INSTAGRAM_TOKEN } = process.env;

exports.handler = async (event) => {

    const { queryStringParameters: { tag, count }} = event;
    
    console.log('query', tag, count);

    const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&&access_token=${API_INSTAGRAM_TOKEN}`;

    const getInstagramData = async (url) => {
        console.log("GET: getInstagramData");
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

    const res = await getInstagramData(url).catch(e => { 
        console.log(e.message); 
    });


    if(res) {
        let data = JSON.parse(res).data;
        
        data = data.filter(post => post.media_type === "IMAGE");
        
        if(tag) {
            data = data.filter(post => post.caption.includes(tag));
        }
        
        if(count) {
            data = data.slice(0, count);
        }
        
        if(data) {
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify(data),
            };
            return response; 
        }
        
    } else {
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify("error no data"),
        };
        return response; 
        
    }

};