import React from "react";
import { Standings } from "../September/Standings";
import { PairingsTable } from "../September/Pairings";
import { currentRound, showPreviousRound, nextRoundTime, showAll } from "./meta.json";

export const CongressEntries = [
    {
        id: 1,
        name: "Peter Shaw",
        ratingInfo: {
            rating: 2264,
        },
    },
    {
        id: 2,
        name: "Chris Bak",
        ratingInfo: {
            rating: 2132,
        },
    },
    {
        id: 3,
        name: "Alan Walton",
        ratingInfo: {
            rating: 2069,
        },
    },
    {
        id: 4,
        name: "Bernard Chan",
        ratingInfo: {
            rating: 2038,
        },
    },
    {
        id: 5,
        name: "Tim Hilton",
        ratingInfo: {
            rating: 2007,
        },
    },
    {
        id: 6,
        name: "Matthew D Webb",
        ratingInfo: {
            rating: 1806,
        },
    },
    {
        id: 7,
        name: "Andrew Wainwright",
        ratingInfo: {
            rating: 1720,
        },
    },
    {
        id: 8,
        name: "Gary Corcoran",
        ratingInfo: {
            rating: 1690,
        },
    },
    {
        id: 9,
        name: "Charlie Woodbridge",
        ratingInfo: {
            rating: 1683,
        },
    },
    {
        id: 10,
        name: "Marc Turu",
        ratingInfo: {
            rating: 1630,
        },
    },
    {
        id: 11,
        name: "Greg Billenness",
        ratingInfo: {
            rating: 1472,
        },
    },
    {
        id: 12,
        name: "Donna Chadwick",
        ratingInfo: {
            rating: 1402,
        },
    }
];

const SixPlayerPairings = [
    {
        round: 1,
        pairings: [
            [1, 7],
            [8, 2],
            [3, 9],
            [10, 4],
            [5, 11],
            [6, 12]
        ],
    },
    {
        round: 2,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 3,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 4,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 5,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 6,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 7,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 8,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 9,
        pairings: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
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
            []
        ],
    },
    {
        round: 2,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 3,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 4,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 5,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 6,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 7,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 8,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
    {
        round: 9,
        pairResults: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
    },
];

const players = [
    ...CongressEntries.map((m, i) => {
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
    console.log(resultBySeed);
    const roundByRound = resultBySeed.reduce((player, { seed, result }) => {

        if (!player[seed]) {
            const p = players.find((p) => p.seed === seed);
            if (p && p.name) {
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
                        division={"Swiss Format"}
                    ></Standings>
                </div>
                {!showAll && (
                    <div className="mt-6">
                        <p className="mb-2 font-medium">Next Round</p>
                        <PairingsTable
                            format={SixPlayerPairings[0]}
                            players={players}
                            results={results}
                            indexer={0}
                        />
                    </div>)}
            </div>
        </div>
    );
}
