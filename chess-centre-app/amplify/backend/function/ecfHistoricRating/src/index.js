const getHistoricRatings = require("./ecfAPI").getHistoricRatings;

exports.handler = async (event) => {

    const info = await getHistoricRatings("225527D", "S");

    console.log(info);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};

