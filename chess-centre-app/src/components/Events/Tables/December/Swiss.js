import React from "react";
import { Standings } from "../Shared/Standings";
import { PairingsTable } from "../Shared/Pairings";
import { swiss } from "./meta.json";


const SixPlayerPairings = [
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
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 3,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 4,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 5,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
];

const results = [
    {
        round: 1,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 2,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 3,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 4,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    {
        round: 5,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
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
                {SixPlayerPairings.slice(0, 1).map((pairings, key) => {
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
