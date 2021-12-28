const fetchPotentialInfo = require("./searchPlayer").fetchPotentialInfo;

exports.handler = async (event) => {

    const { name } = event.pathParameters;
    console.log(`Searching ${name}`);

    const potentialPlayers = await fetchPotentialInfo(name).catch((error) => {
        console.log(error);
        return { success: false };
      });
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: potentialPlayers,
    };
    return response;
};
