const https = require('https');
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { 
    API_GAMESTABLE_NAME
} = process.env;

exports.handler = async (event) => {

    const {
        Items: gamesList
    } = await dynamodb.scan({
        TableName: API_GAMESTABLE_NAME,
        FilterExpression: "attribute_exists(pgnStr) AND attribute_not_exists(getLiChessUrl)"
    }).promise();
    
    console.log(`Fetching pgn strings. Total: ${gamesList.length}`);

    const getLiChessUrl = async (pgn) => {
        const body = JSON.stringify({ pgn });
        const res =  await httpsPost({
            hostname: 'lichess.org',
            path: `/api/import`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body
        });
        return res;
    };

    if(gamesList.length > 0) {
        const complete = Promise.all(gamesList
            .map(async ({ id, pgnStr }) => {
    
            const { url } = JSON.parse(await getLiChessUrl(pgnStr));
    
            if(url) {
                const params = {
                    TableName: API_GAMESTABLE_NAME,
                    Key: {
                        id
                    },
                    UpdateExpression: "set liChessUrl=:url",
                    ExpressionAttributeValues: {
                        ":url": url
                    },
                    ReturnValues: "UPDATED_NEW"
                };
                await dynamodb.update(params).promise();
                return url;
            }
            return;
        }))
    
        await complete;
        console.log("Done");
    } else {
        console.log("No Games to process");
    }

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Done!'),
    };
    return response;
};

function httpsPost({body, ...options}) {
    return new Promise((resolve,reject) => {
        const req = https.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data));
            res.on('end', () => {
                let body = Buffer.concat(chunks);
                switch(res.headers["content-type"]) {
                    case "application/json":
                        body = JSON.parse(body);
                        break;
                    default:
                        break;
                }
                resolve(body);
            })
        })
        req.on('error',reject);
        if(body) {
            req.write(body);
        }
        req.end();
    });
}
