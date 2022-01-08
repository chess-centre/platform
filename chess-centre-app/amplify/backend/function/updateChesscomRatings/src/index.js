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

    // Due to Chess.com enforced rate limit - we run these tasks sequentially:
    for(const member of memberHandles) {
        const info = await getChesscomInfo(member.chesscomUsername);
        if(info && !info.error) {
            console.log("POST: updating record for", member.name);
            await updateMemberRecord(member.id, info);
        } else {
            console.log("unable to update record for", member.name);
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify("done"),
    };
};
