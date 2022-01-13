const getMemberHandles = require("./getMemberHandles").getMemberHandles;
const getLichessOnlineData = require("./getLichessOnlineData").getLichessOnlineData;

exports.handler = async (event) => {
    const handles = await getMemberHandles();
    const query = handles.reduce((users, user) => [...users, user.liChessUsername],[]).join(",");
    const statuses = await getLichessOnlineData(query);
    const response = {
        statusCode: 200,
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*"
         }, 
        body: statuses,
    };
    return response;
};
