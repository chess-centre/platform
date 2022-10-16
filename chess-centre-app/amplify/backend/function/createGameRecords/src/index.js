const AWS = require("aws-sdk");
const fs = require("fs");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { API_GAMESTABLE_NAME } = process.env;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
  
  const gamesObj = JSON.parse(fs.readFileSync('./games.json', 'utf8'));

  console.log(`Preparing batch updates for ${gamesObj.length} games`);
  
  const batchSize = 20;
  const loops = Math.ceil(gamesObj.length / batchSize);
  
  for(let i = 0; i < loops; i++) {
      const batch = i * batchSize;
      try {
        console.log(`Slicing batch start: ${batch} end: ${batch + (batchSize)}`);
        const gamesBatch = gamesObj.slice(batch, batch + (batchSize));
      
        await batchWrite(gamesBatch);
        console.log(`Batch ${i + 1} complete, games added ${gamesBatch.length}`);
      
      } catch(error) {
        console.log(`Batch write error ${error}`);
      }
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Done!"),
  };
};

async function batchWrite(games) {

  if (games.length < 1 || games.length > 25) {
    console.log(`No Games to write ${games.length}`);
    return;
  }

  console.log(`Writing ${games.length} games`);

  let gamesArray = [];

  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    let item = {
      PutRequest: {
        Item: game,
      },
    };

    if (item) {
      gamesArray.push(item);
    }
  }

  let params = {
    RequestItems: {
      [API_GAMESTABLE_NAME]: gamesArray,
    },
  };

  try{
    console.log(`preparing bulk upload ${JSON.stringify(params)}`);
    await dynamodb.batchWrite(params).promise();
  } catch(error){
    console.log(error);
  }
}
