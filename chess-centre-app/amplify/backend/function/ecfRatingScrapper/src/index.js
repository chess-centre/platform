const AWS = require("aws-sdk");
const { API_CHESSPLAYERS_MEMBERTABLE_NAME } = process.env;
const fetchInfo = require("./ecfAPI").fetchInfo;
const fetchRating = require("./ecfAPI").fetchRating;
const sendRatingUpdateEmail = require("./sendEmail").sendRatingUpdateEmail;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = API_CHESSPLAYERS_MEMBERTABLE_NAME;

exports.handler = async (event) => {

    try {
        // Grab all members whose rating we want to check and update:
        const {
            Items
        } = await dynamodb.scan({
            TableName: memberTable,
            FilterExpression: "attribute_exists(ecfId)"
        }).promise();
        console.log(`Preparing to update ${Items.length} member records`);

        const getAllRatingInfo = await Promise.all(Items.map(m => {
            console.log(`Fetching rating info for ${m.name}`);
            const getAllData = async () => {
                const info = await fetchInfo(m.ecfId);
                const standardRating = await fetchRating(m.ecfId, "S");
                const rapidRating = await fetchRating(m.ecfId, "R");
                return {
                    id: m.id,
                    ecfId: m.ecfId,
                    name: m.name,
                    oldRating: m.ecfRating,
                    oldRapid: m.ecfRapid,
                    ...JSON.parse(info),
                    standard: JSON.parse(standardRating),
                    rapid: JSON.parse(rapidRating)
                };
            };
            return getAllData();
        }));

        let erredChecks = 0;
        let erredMembers = [];

        // Now update all our member records:
        console.log("Updating member records");
        const updates = getAllRatingInfo.map(async member => {
           
            
            if(!member.standard.success && !member.rapid.success) {
                console.log(`${member.name} doesn't have any ratings! Please check ${member.ecfId} for user ${member.id}`);
                erredChecks += 1;
                erredMembers.push({ name: member.name, ecfId: member.ecfId });
                return;
            }
            
            console.log(`Updated record for ${member.name} ${member.id} ${member.standard?.original_rating} ${member.rapid?.original_rating}`);

            const params = {
                TableName: memberTable,
                Key: {
                    id: member.id
                },
                UpdateExpression: "set ecfRating=:standard, ecfRapid=:rapid, gender=:gender, fideId=:fide, club=:club, ecfMembership=:membership",
                ExpressionAttributeValues: {
                    ":standard": member.standard?.original_rating | null,
                    ":rapid": member.rapid?.original_rating | null,
                    ":gender": member.gender,
                    ":club": member.club_name,
                    ":fide": member.FIDE_no,
                    ":membership": member.category
                },
                ReturnValues: "UPDATED_NEW"
            };
            return await dynamodb.update(params).promise();
        });
        const complete = await Promise.all(updates);
        console.log("Update complete", complete);

        // Let us know the changes which were made:
        await sendRatingUpdateEmail(getAllRatingInfo, erredChecks, erredMembers);
        console.log("Email update sent.");

    } catch (error) {
        console.log('Error', error);
    }

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(`Scrapper complete!d`),
    };
    return response;
};