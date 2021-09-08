const AWS = require("aws-sdk");
const  uuid = require('uuid');
const { API_CHESSPLAYERS_MEMBERTABLE_NAME,
    API_CHESSPLAYERS_EVENTTABLE_NAME,
    API_CHESSPLAYERS_GAMESTABLE_NAME
} = process.env;
const fetchGames = require("./ecfAPI").fetchGames;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const memberTable = API_CHESSPLAYERS_MEMBERTABLE_NAME;
const eventTable = API_CHESSPLAYERS_EVENTTABLE_NAME;
const gameTable = API_CHESSPLAYERS_GAMESTABLE_NAME;
const TOTAL_GAMES_TO_CHECK = 150;
const TRACKED_EVENT_IDS = [];

exports.handler = async () => {
    try {
        const {
            Items: membersList
        } = await dynamodb.scan({
            TableName: memberTable,
            FilterExpression: "attribute_exists(ecfId)"
        }).promise();
        console.log(`Fetching games for ${membersList.length} players.`);
        const getAllGameInfo = await Promise.all(membersList.map(member => {
            // Iterates over each player in the members table and fetches their published ECF games.
            const getAllData = async () => {
                const standardGames = await fetchGames(member.ecfId, "Standard", TOTAL_GAMES_TO_CHECK);
                const rapidGames = await fetchGames(member.ecfId, "Rapid", TOTAL_GAMES_TO_CHECK);
                const standardGamesValidated = stageGames(member, standardGames, membersList, "standard");
                const rapidGamesValidated = stageGames(member, rapidGames, membersList, "rapid");

                return [
                    ...standardGamesValidated,
                    ...rapidGamesValidated
                ];
            };
            // This returns all games played checking for "The Chess Centre" as an event type:
            return getAllData();
        }));

        const uniqueGames = getAllGameInfo
            .flat(2)
            // removes deplicates (as we are checking all players at the same time)
            .filter((value, index, arr) =>
                arr.findIndex(t => (JSON.stringify(t) === JSON.stringify(value))) === index);

        const games = await addEventId(uniqueGames);
        console.log(`Games ready for adding to db ${games.length}`);
        if(games && games.length > 0) {
            await addGames(games);
            await updateEvents([...new Set(TRACKED_EVENT_IDS)]);
            console.log(`Updated!`);
        } else {
            console.log("No games to update.");
        }
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

function eventNameCheck(game) {
    let name = "";
    if(game.event_name) {
        name = game.event_name;
    } else if(game.org_name) {
        name = game.org_name;
    };
    return name
            .replace("The Chess Centre ", "")
            .replace("The Chess Centre - ", "")
            .replace("The Chess Centre", ""); // You'd be surprised! example event_name "The Chess Centre The Chess Centre - August Congress"
}

function stageGames(member, games, members, type) {
    // This function is carrying out a number of important tasks:
    // 1. filtering games from players by "The Chess Centre" (the ecf API only gives all games)
    // 2. adding our internal memberId to both: whiteMemberId & blackMemberId
    // 3. adds point in time ratings of the game record (!! assuming this runs in a timely fashion! ie soon after an event is played);

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
        const results = json.games.filter(({ event_name, org_name }) => {
            const includes = ((event, org) => {
                try {
                    return event.toString().includes("The Chess Centre") || org.toString().includes("The Chess Centre");
                } catch (error) {
                    console.log("error", event, member);
                    return false;
                }
            })(event_name, org_name);
            return includes;
        });
        // MAP published games to internal members:
        const gameList = results.reduce((list, game) => {
            const opponent = members.find(m => m.ecfId.includes(game.opponent_no));
            if (opponent && opponent.id) {
                const whitePlayer = game.colour === "W" ? member : opponent;
                const blackPlayer = game.colour === "B" ? member : opponent;

                const eventName = eventNameCheck(game);

                return [...list, {
                    whiteMemberId: whitePlayer.id,
                    whiteName: whitePlayer.name,
                    blackMemberId: blackPlayer.id,
                    blackName: blackPlayer.name,
                    date: game.game_date,
                    whiteRating: type === "standard" ? whitePlayer.ecfRating : whitePlayer.ecfRapid,
                    blackRating: type === "standard" ? blackPlayer.ecfRating : blackPlayer.ecfRapid,
                    eventName,
                    result: calculateGameResult(game.colour, game.score),
                    type
                }];
            } else {
                return [...list];
            }
        }, []);
        return gameList;
    } else {
        return [];
    }
}



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
        return "1-0";
    }
    return "0.5-0.5";
}

async function addEventId(games) {
    try {
        // We assume events with entries (entryCount) as those which have associated games:
        const { Items: events } = await dynamodb.scan({
            TableName: eventTable,
            FilterExpression: `entryCount > :count and (ecfGamesRetreived = :pending or attribute_not_exists(ecfGamesRetreived))`,
            ExpressionAttributeValues: {
                ':count': 0,
                ':pending': false
            }
        }).promise();

        console.log(`Events found: ${events.length}`);

        const gamesWithEventIds = games.map(game => {
            const event = events.find(({ startDate }) => startDate === game.date);
            const eventId = event?.id;
            if(!eventId) {
                console.log(`Couldn't find event Id for ${JSON.stringify(game)} ${JSON.stringify(event)}`);
            } else {
                // used to ensure we don't duplicate events!
                TRACKED_EVENT_IDS.push(eventId);
            }
            return {
                ...game,
                eventId
            };
        });
        return gamesWithEventIds.filter(game => !!game.eventId);
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

async function addGames(games) {
    const timestamp = new Date().toISOString();
    const updates = games.map(async (game) => {
        const params = {
            TableName: gameTable,
            Item: {
                id: uuid.v1(),
                __typename: "Game",
                _lastChangedAt: Date.now(),
                createdAt: timestamp,
                updatedAt: timestamp,
                _version: 1,
                ...game
            },
            ReturnValues: 'ALL_OLD'
        };
        try {
            const result = await dynamodb.put(params).promise();
            return result;
        } catch (error) {
            console.log(error);
        } 
    });
    await Promise.all(updates);
    console.log("Updated games!");
    return;
}

async function updateEvents(eventIds) {
    const updates = eventIds.map(async (id) => {
        const params = {
            TableName: eventTable,
            Key: {
                id
            },
            UpdateExpression: "set ecfGamesRetreived=:retreived",
            ExpressionAttributeValues: {
                ":retreived": true,
            },
            ReturnValues: "UPDATED_NEW"
        };
        return await dynamodb.update(params).promise();
    });
    await Promise.all(updates);
    console.log("Updated events!");
    return;
}