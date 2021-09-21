import React from "react";
import { Standings } from "./Standings";
import { PairingsTable } from "./Pairings";
import { currentRound, showPreviousRound, nextRoundTime } from "./meta.json";

export const CongressEntries = [
    {
        id: 1,
        name: "Thomas Wills",
        ratingInfo: {
            rating: 1923,
        },
    },
    {
        id: 2,
        name: "Kevin Winter",
        ratingInfo: {
            rating: 1802,
        },
    },
    {
        id: 3,
        name: "Gary Hinchcliffe",
        ratingInfo: {
            rating: 1773,
        },
    },
    {
        id: 4,
        name: "Andrew Wainwright",
        ratingInfo: {
            rating: 1721,
        },
    },
    {
        id: 5,
        name: "Martin Gawne",
        ratingInfo: {
            rating: 1698,
        },
    },
    {
        id: 6,
        name: "Gawain Ako",
        ratingInfo: {
            rating: 1625,
        },
    },
    {
        id: 7,
        name: "Alannah Ashton",
        ratingInfo: {
            rating: 1514,
        },
    },
    {
        id: 8,
        name: "Donna Chadwick",
        ratingInfo: {
            rating: 1405,
        },
    },
    {
        id: 9,
        name: "Shriaansh Ganti",
        ratingInfo: {
            rating: 1375,
        },
    },
    {
        id: 10,
        name: "Emlyn Hauber",
        ratingInfo: {
            rating: undefined,
        },
    }
];

const SixPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 7],
            [2, 6],
            [3, 5],
            [8, 10],
            [4, 9],
        ],
    },
    {
        round: 2,
        pairings: [
            [6, 1],
            [4, 3],
            [10, 9],
            [7, 8],
            [5, 2],
        ],
    },
    {
        round: 3,
        pairings: [
            [1, 9],
            [3, 6],
            [2, 7],
            [10, 5],
            [8, 4],
        ],
    },
    {
        round: 4,
        pairings: [
            [6, 5],
            [9, 8],
            [7, 10],
            [3, 2],
            [4, 1],
        ],
    },
    {
        round: 5,
        pairings: [
            [1, 3],
            [5, 8],
            [7, 9],
            [2, 10],
            [4, 6],
        ],
    },
];

const results = [
    {
        round: 1,
        pairResults: [[1, 0], [0, 1], [1, 0], [1, 0], [0.5, 0.5]],
    },
    {
        round: 2,
        pairResults: [[0, 1], [0.5, 0.5], [0, 1], [1, 0], [0.5, 0.5]],
    },
    {
        round: 3,
        pairResults: [[1, 0], [0, 1], [1, 0], [0, 1], [0, 1]],
    },
    {
        round: 4,
        pairResults: [[1, 0], [0.5, 0.5], [0.5, 0.5], [1, 0], [1, 0]],
    },
    {
        round: 5,
        pairResults: [[1,0], [1,0], [0,1], [1,0], [0, 1]],
    },
];

const players = [
    ...CongressEntries.slice(0, 10).map((m, i) => {
        m.seed = i + 1;
        return m;
    }),
];

const resultCheck = (players) => {
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
                rating: p.ratingInfo.rating,
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

export default function Rapidplay() {
    return (
        <div className="col-span-2 mx-72 mt-4">

            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <Standings
                        roundByRound={roundByRound}
                        division={"Division 2 (Swiss)"}
                    ></Standings>
                </div>
                <div className="mt-6">
                    {showPreviousRound && (
                        <div className="mb-2">
                            <p className="mb-2 font-medium">Previous Round</p>
                            <PairingsTable
                                format={SixPlayerPairings[currentRound - 2]}
                                players={players}
                                results={results}
                                indexer={3}
                            />
                        </div>
                    )}
                    <p className="mb-2 font-medium">Next Round</p>
                    <PairingsTable
                        format={SixPlayerPairings[currentRound - 1]}
                        players={players}
                        results={results}
                        indexer={3}
                    />
                </div>
            </div>
        </div>
    );
}
