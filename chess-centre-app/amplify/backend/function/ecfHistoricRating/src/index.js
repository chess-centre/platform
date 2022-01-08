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
        
        const historicData = new Map();
        
        const result = await Promise.all(members.map(async (member) => {
            console.log(`Checking rating data for ${member.name}`);
            const data = await getHistoricRatings(member.ecfId);
            if(data && data.length > 0) {
                historicData.set(member.id, data);
            } else {
                console.log("No data!");
            }
        }));
        
        await Promise.all(members.map(async (member) => {
             const params = {
                    TableName: memberTable,
                    Key: {
                        id: member.id
                    },
                    UpdateExpression: "set ratingInfo=:info",
                    ExpressionAttributeValues: {
                        ":info": historicData.get(member.id)
                    },
                    ReturnValues: "UPDATED_NEW"
                };
                try {
                    const response = await dynamodb.update(params).promise();
                    console.log(`Saving rating data for ${member.name}`);
                    return response;
                } catch (e) {
                    console.log("error caught!");
                    console.log(e);
                }
        }));
        
        console.log(`Total records updated ${result.length}`);
    } catch (error) {
        console.log("Error", error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
};