const AWS = require("aws-sdk");
const { API_CHESSPLAYERS_MEMBERTABLE_NAME } = process.env;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = API_CHESSPLAYERS_MEMBERTABLE_NAME;
const getHistoricRatings = require("./ecfAPI").getHistoricRatings;

exports.handler = async (event) => {

    try {
        const {
            Items: members
        } = await dynamodb.scan({
            TableName: memberTable,
            FilterExpression: "attribute_exists(ecfId)"
        }).promise();
        
        console.log(`Fetching historic rating data for ${members.length} members`);
        
        const dbUpdateQueue = new Map();

        const records = await Promise.all(members.map(async (member) => {
            console.log(`Checking rating data for ${member.name}`);
            const data = await getHistoricRatings(member.ecfId);
            if(data && data.length > 0) {
                const params = {
                    TableName: memberTable,
                    Key: {
                        id: member.id
                    },
                    UpdateExpression: "set ratingInfo=:info",
                    ExpressionAttributeValues: {
                        ":info": data
                    },
                    ReturnValues: "UPDATED_NEW"
                };

                dbUpdateQueue.set(member.name, params);
                
                return member.name;
            } else {
                console.log("No data!");
            }
        }));

        console.log(`Saving rating data for ${dbUpdateQueue.size} records`);

        const result = await Promise.all(dbUpdateQueue.values(async params => dynamodb.update(params).promise()));        

        console.log(`Total records updated ${result.length} for ${records.length} players`);

    } catch (error) {
        console.log("Error", error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
};