import React from "react";
import { Standings } from "../September/Standings";
import { PairingsTable } from "../September/Pairings";
import { currentRound, showPreviousRound, nextRoundTime, showAll } from "./meta.json";

export const CongressEntries = [
    {
        id: 1,
        name: "David Patrick",
        ratingInfo: {
            rating: 1895,
        },
    },
    {
        id: 2,
        name: "Richard Porter",
        ratingInfo: {
            rating: 1893,
        },
    },
    {
        id: 3,
        name: "Gerald Cuaresma",
        ratingInfo: {
            rating: 1863,
        },
    },
    {
        id: 4,
        name: "Andrew Wainwright",
        ratingInfo: {
            rating: 1720,
        },
    },
    {
        id: 5,
        name: "Jon Duckham",
        ratingInfo: {
            rating: 1840,
        },
    },
    {
        id: 6,
        name: "Emlyn Hauber",
        ratingInfo: {
            rating: 1323,
        },
    },
    {
        id: 7,
        name: "Danavir Dhunna",
        ratingInfo: {
            rating: 1128,
        },
    },
    {
        id: 8,
        name: "Emma Duckham",
        ratingInfo: {
            rating: undefined,
        },
    },

];

const SixPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 5],
            [6, 2],
            [3, 7],
            [8, 4]
        ],
    },
    {
        round: 2,
        pairings: [
            [4,1],
            [2,3],
            [7,8],
            [5,6]
        ],
    },
    {
        round: 3,
        pairings: [
            [1,2],
            [3,5],
            [7,4],
            [6,8]
        ],
    },
    {
        round: 4,
        pairings: [
            [4,3],
            [8,1],
            [5,2],
            [6,7]
        ],
    },
    {
        round: 5,
        pairings: [
            [3,1],
            [2,8],
            [4,6],
            [7,5]
        ],
    },
];

const results = [
    {
        round: 1,
        pairResults: [
            [1,0],
            [0,1],
            [1,0],
            [0.5, 0.5]
        ],
    },
    {
        round: 2,
        pairResults: [
            [0.5,0.5],
            [0.5, 0.5],
            [1,0],
            [1,0]
        ],
    },
    {
        round: 3,
        pairResults: [
            [0.5,0.5],
            [1,0],
            [0,1],
            [0.5, 0.5]
        ],
    },
    {
        round: 4,
        pairResults: [
            [0,1],
            [0.5,0.5],
            [0,1],
            [1,0]
        ],
    },
    {
        round: 5,
        pairResults: [
            [1,0],
            [1,0],
            [1,0],
            [0,1]
        ],
    },
];

const players = [
    ...CongressEntries.slice(0, 8).map((m, i) => {
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
        console.log(players);
        if (!player[seed]) {
            const p = players.find((p) => p.seed === seed);
            if (!p) return player;
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
        <div className="col-span-2 mx-10 mt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="">
                    <Standings
                        roundByRound={roundByRound}
                        division={"Overall"}
                    ></Standings>
                </div>

                <div className="mb-2">
                <h3 className="text-2xl mb-2 -mt-4 font-semibold text-pink-900 text-center">Round Pairings</h3>
                    <PairingsTable
                        format={SixPlayerPairings[4]}
                        players={players}
                        results={results}
                        indexer={0}
                    />
                </div>
            </div>
        </div>
    );
}
