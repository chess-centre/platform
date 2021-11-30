import React from "react";
import { Standings } from "../Shared/Standings";
import { PairingsTable } from "../Shared/Pairings";
import { currentRound, showPreviousRound, nextRoundTime, showAll, swiss } from "./meta.json";


const SixPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 6],
            [7, 2],
            [3, 8],
            [9, 4],
            [5, 10]
        ],
    },
    {
        round: 2,
        pairings: [
            [4, 1],
            [2, 3],
            [8, 5],
            [10, 7],
            [6, 9],
        ],
    },
    {
        round: 3,
        pairings: [
            [1,3],
            [5,2],
            [10,4],
            [7,6],
            [9,8],
        ],
    },
    {
        round: 4,
        pairings: [
            [3,5],
            [2,1],
            [6,10],
            [9,7],
            [4,8],
        ],
    },
    {
        round: 5,
        pairings: [
            [10,3],
            [1,5],
            [6,4],
            [8,7],
            [2,9],
        ],
    },
];

const results = [
    {
        round: 1,
        pairResults: [[1, 0], [0, 1], [1, 0], [0, 1], [1, 0]],
    },
    {
        round: 2,
        pairResults: [[0, 1], [0,1], [0, 1], [1, 0], [1, 0]],
    },
    {
        round: 3,
        pairResults: [[0,1], [0,1], [1,0], [0,1], [1,0]],
    },
    {
        round: 4,
        pairResults: [[0.5,0.5], [0,1], [0,1], [0,1], [1,0]],
    },
    {
        round: 5,
        pairResults: [[1,0], [1,0], [0,1], [0,1], [1,0]],
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

            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <Standings
                        roundByRound={roundByRound}
                        division={"Division 2 (Swiss)"}
                    ></Standings>
                </div>

                {SixPlayerPairings.map((pairings, key) => {
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
    );
}
