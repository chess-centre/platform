const getMemberHandles = require("./getMemberHandles").getMemberHandles;
const getChesscomInfo = require("./getChesscomInfo").getChesscomInfo;
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
            body: JSON.stringify({ error: "No chess.com handles found!"}),
        };
    }

    const chesscomDate = await Promise.all(memberHandles.map(async m => {
        const info = await getChesscomInfo(m.chesscomUsername);
        if(info && !info.error) {
            console.log("POST: updating record for", m.name);
            await updateMemberRecord(m.id, info);
            return true;
        } else {
            console.log("unable to update record for", m.name);
            return false;
        }
    }));

    if(chesscomDate) {
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
