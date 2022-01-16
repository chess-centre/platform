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
    
    console.log(memberHandles.length);
    
    for(const member of memberHandles) {
        
        const bullet = member?.liChessInfo?.perfs?.bullet?.rating;
        const blitz = member?.liChessInfo?.perfs?.blitz?.rating;
        const rapid = member?.liChessInfo?.perfs?.rapid?.rating;
     
        const response = await getLichessInfo(member.liChessUsername);
        const liChessInfo = JSON.parse(response);
        
        if(bullet) liChessInfo.perfs.bullet["prev"] = bullet;
        if(blitz) liChessInfo.perfs.blitz["prev"] = blitz;
        if(rapid) liChessInfo.perfs.rapid["prev"] = rapid;

        
        if(liChessInfo) {
            console.log("POST: updating record for", member.name);
            await updateMemberRecord(member.id, liChessInfo);
            return true;
        } else {
            console.log("unable to update record for", member.name);
            return false;
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