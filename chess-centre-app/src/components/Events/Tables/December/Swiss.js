import React from "react";
import { Standings } from "../Shared/Standings";
import { PairingsTable } from "../Shared/Pairings";
import { swiss } from "./meta.json";


const SwissPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 8],
            [9, 2],
            [3, 10],
            [11, 4],
            [5, 12],
            [13, 6],
            [7, 14]
        ]
    },
    {
        round: 2,
        pairings: [
            [2,5],
            [4,3],
            [6,1],
            [8,7],
            [10,9],
            [12,11],
            [14,13]
        ]
    },
    {
        round: 3,
        pairings: [
            [1,2],
            [5,4],
            [11,10],
            [3,6],
            [13,8],
            [7,12],
            [9,14]
        ]
    },
    {
        round: 4,
        pairings: [
            [4,1],
            [2,11],
            [6,5],
            [8,9],
            [10,7],
            [12,13],
            [14,3]
        ]
    },
    {
        round: 5,
        pairings: [
            [8,2],
            [1,5],
            [6,10],
            [11,3],
            [9,4],
            [7,13],
            [14,12]
        ]
    },
];

const results = [
    {
        round: 1,
        pairResults: [
            [1,0],
            [0,1],
            [1,0],
            [0,1],
            [1,0],
            [0,1],
            [1,0]
        ]
    },
    {
        round: 2,
        pairResults: [
            [1,0],
            [1,0],
            [0,1],
            [1,0],
            [1,0],
            [0,1],
            [0,1]
        ]
    },
    {
        round: 3,
        pairResults: [
            [0.5,0.5],
            [1,0],
            [1,0],
            [0,1],
            [0,1],
            [0,1],
            [1,0]
        ]
    },
    {
        round: 4,
        pairResults: [
            [0,1],
            [1,0],
            [0,1],
            [1,0],
            [1,0],
            [0,1],
            [0,1]
        ]
    },
    {
        round: 5,
        pairResults: [
            [0,1],
            [0,1],
            [1,0],
            [0,1],
            [0,1],
            [1,0],
            [0,1]
        ]
    },
];

const players = [
    ...swiss.map((m, i) => {
        m.seed = i + 1;
        return m;
    }),
];

const resultCheck = (players) => {
    const resultBySeed = [];
    SwissPlayerPairings.forEach(({ round, pairings }) => {
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
            if (p) {
                player[seed] = {
                    rounds: [result],
                    total: result || 0,
                    name: p?.name,
                    rating: p?.ratingInfo.rating,
                };
            }
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

            <div className="grid grid-cols-2 gap-16">
                <div>
                    <Standings
                        roundByRound={roundByRound}
                        division={"Standings"}
                    ></Standings>
                </div>

                <div>
                <h3 className="text-2xl mb-2 -mt-4 font-semibold text-teal-500 text-center">Pairings</h3>
                {SwissPlayerPairings.slice(4, 5).map((pairings, key) => {
                    return (
                        <div key={key} className="mt-2">
                            <PairingsTable
                                format={pairings}
                                players={players}
                                results={results}
                                indexer={0}
                            />
                        </div>
                    );
                })}
                </div>

            </div>
        </div>
    );
}
