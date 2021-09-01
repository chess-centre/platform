

const AWS = require("aws-sdk");
const { API_CHESSPLAYERS_MEMBERTABLE_NAME } = process.env;
const fetchGames = require("./ecfAPI").fetchGames;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = API_CHESSPLAYERS_MEMBERTABLE_NAME;

exports.handler = async () => {

    try {
        const {
            Items
        } = await dynamodb.scan({
            TableName: memberTable,
            FilterExpression: "attribute_exists(ecfId)"
        }).promise();

        console.log(`Fetching games for ${Items.length} players.`);

        const getAllGameInfo = await Promise.all(Items.map(member => {
            const getAllData = async () => {
                const standardGames = await fetchGames(member.ecfId, "Standard", 100);
                const rapidGames = await fetchGames(member.ecfId, "Rapid", 100);

                const standardGamesValidated = stageGames(member, standardGames, Items, "standard");
                const rapidGamesValidated = stageGames(member, rapidGames, Items, "rapid");

                return [
                    ...standardGamesValidated,
                    ...rapidGamesValidated
                ];
            };
            return getAllData();
        }));

        const uniqueGames = getAllGameInfo
            .flat(2)
            .filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);

        console.log(uniqueGames);

    } catch (error) {
        console.log(error);
    }
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify("Done"),
    };
    return response;
};

function stageGames(member, games, members, type) {

    const json = (function (raw) {
        try {
            return JSON.parse(raw);
        } catch (err) {
            console.log("Error parsing JSON", type);
            return false;
        }
    })(games);

    if (json && json.games) {
        // GET only Chess Centre games:
        const results = json.games.filter(({ event_name }) => {

            const includes = ((event) => {
                try {
                    return event.toString().includes("The Chess Centre")
                } catch (error) {
                    console.log("error", event, member);
                    return false;
                }
            })(event_name);

            return includes;
        });
        // MAP published games to internal members:
        const gameList = results.reduce((list, game) => {
            const opponent = members.find(m => m.ecfId.includes(game.opponent_no));
            if (opponent && opponent.id) {

                const whitePlayer = game.colour === "W" ? member : opponent;
                const blackPlayer = game.colour === "B" ? member : opponent;

                return [...list, {
                    whiteMemberId: whitePlayer.id,
                    whiteName: whitePlayer.name,
                    blackMemberId: blackPlayer.id,
                    blackName: blackPlayer.name,
                    opponentRating: game.player_rating,
                    eventName: game.event_name.replace("The Chess Centre", ""),
                    result: calculateGameResult(game.colour, game.score),
                    type: type
                }]
            } else {
                return [...list];
            }
        }, []);
        return gameList;
    } else {
        return [];
    }
};

function calculateGameResult(colour, score) {

    if (score === 5) {
        return "0.5-0.5";
    }

    if (colour === "W" && score === 1) {
        return "1-0";
    }

    if (colour === "W" && score === 0) {
        return "0-1";
    }

    if (colour === "B" && score === 1) {
        return "0-1";
    }

    if (colour === "B" && score === 0) {
        return "1-0"
    }

    return "0.5-0.5";
}
