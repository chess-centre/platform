
const getMemberHandles = require("./getMemberHandles").getMemberHandles;
const getLichessInfo = require("./getLichessInfo").getLichessInfo;
const updateMemberRecord = require("./updateMemberRecord").updateMemberRecord;


exports.handler = async (event) => {

    const memberHandles = await getMemberHandles();

    if(!memberHandles) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({ error: "No lichess handles found!"}),
        };
    }

    const lichessData = await Promise.all(memberHandles.map(async m => {
        const info = await getLichessInfo(m.liChessUsername);
        if(info) {
            console.log("POST: updating record for", m.name);
            await updateMemberRecord(m.id, info);
            return true;
        } else {
            console.log("unable to update record for", m.name);
            return false;
        }
    }));

    if(lichessData) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify("done"),
        };
    } else {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({ error: "Something went wrong!"}),
        };
    }
};

