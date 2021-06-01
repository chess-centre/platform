import React from "react";

export const CongressEntries = [
    {
        id: 1,
        name: "Peter Shaw",
        ratingInfo: {
            rating: 2268,
        },
    },
    {
        id: 2,
        name: "Chris Bak",
        ratingInfo: {
            rating: 2163,
        },
    },
    {
        id: 3,
        name: "David Barlow",
        ratingInfo: {
            rating: 1908,
        },
    },
    {
        id: 4,
        name: "Chris Wright",
        ratingInfo: {
            rating: 2028,
        },
    },
    {
        id: 5,
        name: "Sam Davies",
        ratingInfo: {
            rating: 1960,
        },
    },
    {
        id: 6,
        name: "Martin Gawne",
        ratingInfo: {
            rating: 1690,
        },
    }]


const SixPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 6],
            [2, 5],
            [3, 4],
        ],
    },
    {
        round: 2,
        pairings: [
            [6, 4],
            [5, 3],
            [1, 2],
        ],
    },
    {
        round: 3,
        pairings: [
            [2, 6],
            [3, 1],
            [4, 5],
        ],
    },
    {
        round: 4,
        pairings: [
            [6, 5],
            [1, 4],
            [2, 3],
        ],
    },
    {
        round: 5,
        pairings: [
            [3, 6],
            [4, 2],
            [5, 1],
        ],
    },
];

const results = [
    {
        round: 1,
        pairResults: [[1,0], [1,0], [1,0]],
    },
    {
        round: 2,
        pairResults: [[1,0], [0.5, 0.5], [1,0]],
    },
    {
        round: 3,
        pairResults: [[0,1], [0,1], [0,1]],
    },
    {
        round: 4,
        pairResults: [[0,1], [1,0], [1,0]],
    },
    {
        round: 5,
        pairResults: [[1,0], [1,0], [0.5,0.5]],
    }
];

const players = [
    ...CongressEntries.slice(0, 6).map((m, i) => {
        m.seed = i + 1;
        return m;
    }),
];

const resultCheck = () => {
    const resultBySeed = [];
    SixPlayerPairings.forEach(({ round, pairings }) => {
        const pairingResults = results.find((r) => r.round === round).pairResults;
        pairings.forEach((board, index) => {
            const whitePlayer = board[0];
            const blackPlayer = board[1];
            const whiteResultOfSeed = pairingResults[index][0];
            const blackResultOfSeed = pairingResults[index][1];
            resultBySeed.push(
                {
                    seed: whitePlayer,
                    result: whiteResultOfSeed,
                    opponent: blackPlayer,
                    round,
                },
                {
                    seed: blackPlayer,
                    result: blackResultOfSeed,
                    opponent: whitePlayer,
                    round,
                }
            );
        });
    });
    const roundByRound = resultBySeed.reduce((player, { seed, result }) => {
        if (!player[seed]) {
            const p = players.find((p) => p.seed === seed);
            player[seed] = {
                rounds: [result],
                total: result || 0,
                name: p.name,
                rating: p.ratingInfo.rating
            };
        } else {
            player[seed].rounds.push(result);
            player[seed].total += result || 0;
        }
        return player;
    }, {});
    return { resultBySeed, roundByRound };
};

const { roundByRound } = resultCheck(players);

export const CurrentStandings = () => {
    return (
        <div>
            <h1 className="mb-2 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Division 1
      </h1>
      <h2 className="mb-2 text-1xl font-semibold text-center text-gray-700 dark:text-gray-200">Overall Standings</h2>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Player
            </th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Round by Round
            </th>
                        <th
                            scope="col"
                            className="relative px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Total
            </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.values(roundByRound)
                        .sort((a, b) => Number(b.total) - Number(a.total))
                        .map((data, key) => {
                            return (
                                <tr key={key} className="bg-white dark:bg-gray-800">
                                    <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-300">
                                        {data.name} <span className="font-thin">({data.rating ? data.rating : "unrated"})</span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-md text-gray-700 dark:text-gray-300">
                                        <div className="flex">
                                            {data.rounds.map((r) =>
                                                r ? (
                                                    <div className="px-2">{r === 0.5 ? "½" : r}</div>
                                                ) : r === 0 ? (
                                                    <div className="px-2">{r}</div>
                                                ) : (
                                                    ""
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-md text-gray-500 dark:text-gray-300">
                                        {data.total}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export const PairsTable = ({ format, players, results }) => {
    const { round, pairings } = format;
    return (
        <div>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            White
            </th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Vs
            </th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Black
            </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800">
                        {/* using colSpan=3 here means the header VS doesn't align center with the Round */}
                        <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
                        <td className="px-4 sm:px-6 py-1 text-center text-xs font-medium text-gray-900 dark:text-gray-300">
                            Round {round}
                        </td>
                        <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
                    </tr>
                    {pairings.map((p, key) => {
                        const [white, black] = results.find(
                            (r) => r.round === round
                        ).pairResults[key];
                        const whitePlayer = players.find((player) => player.seed === p[0]);
                        const blackPlayer = players.find((player) => player.seed === p[1])
                        return (
                            <tr key={key} className="bg-white dark:bg-gray-800">
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md  font-medium text-gray-700 dark:text-gray-300">
                                    {whitePlayer.name} <span className="font-thin">({whitePlayer.ratingInfo.rating ? whitePlayer.ratingInfo.rating : "unrated"})</span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-md text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                                    {white || black
                                        ? `${white === 0.5 ? "½" : white} - ${black === 0.5 ? "½" : black
                                        }`
                                        : "? - ?"}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700 dark:text-gray-300">
                                    {blackPlayer.name} <span className="font-thin">({blackPlayer.ratingInfo.rating ? blackPlayer.ratingInfo.rating : "unrated"})</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/* 
 * This view pulls in three key components:
    1) the local iframe for internal DGT boards
    2) the current table / standings for the event
    3) relevant QR code for smartphones to pull up the games on their phone
*/
export const Internal = (props) => {
    const { url } = props;

    return (
        <div className="grid gap-4 px-2 py-2 h-screen">
            <div className="col-span-2 bg-gray-100 rounded-lg shadow-xs p-8">
                <div className="mb-4">
                    <CurrentStandings></CurrentStandings>
                </div>
                <div className="mb-4">
                <h2 className="mb-2 text-1xl font-semibold text-center text-gray-700 dark:text-gray-200">Previous Round</h2> 
                    <PairsTable
                        format={SixPlayerPairings[3]}
                        players={players}
                        results={results}
                    />
                </div>
                <div>
                <h2 className="mb-2 text-1xl font-semibold text-center text-gray-700 dark:text-gray-200">Current Round</h2> 
                    <PairsTable
                        format={SixPlayerPairings[4]}
                        players={players}
                        results={results}
                    />
                </div>
            </div>
        </div>
    );
};

export default Internal;
