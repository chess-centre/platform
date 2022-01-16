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

        const bullet = member?.chesscomInfo?.chess_bullet?.last?.rating;
        const blitz = member?.chesscomInfo?.chess_blitz?.last?.rating;
        const rapid = member?.chesscomInfo?.chess_rapid?.last?.rating;

        const chesscomInfo = await getChesscomInfo(member.chesscomUsername);

        if(chesscomInfo && !chesscomInfo.error) {

            if(bullet) chesscomInfo.chess_bullet.last["prev"] = bullet;
            if(blitz) chesscomInfo.chess_blitz.last["prev"] = blitz;
            if(rapid) chesscomInfo.chess_rapid.last["prev"] = rapid;

            console.log("POST: updating record for", member.name);
            await updateMemberRecord(member.id, chesscomInfo);
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
