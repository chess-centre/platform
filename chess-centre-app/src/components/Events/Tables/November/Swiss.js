import React from "react";
import { Standings } from "../Shared/Standings";
import { PairingsTable } from "../Shared/Pairings";
import { currentRound, showPreviousRound, nextRoundTime, showAll, swiss } from "./meta.json";


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
            [],
            [],
            [],
            [],
        ],
    },
    {
        round: 3,
        pairings: [
            [],
            [],
            [],
            [],
        ],
    },
    {
        round: 4,
        pairings: [
            [],
            [],
            [],
            [],
        ],
    },
    {
        round: 5,
        pairings: [
            [],
            [],
            [],
            [],
        ],
    },
];

const results = [
    {
        round: 1,
        pairResults: [[], [], [], []],
    },
    {
        round: 2,
        pairResults: [[], [], [], []],
    },
    {
        round: 3,
        pairResults: [[], [], [], []],
    },
    {
        round: 4,
        pairResults: [[], [], [], []],
    },
    {
        round: 5,
        pairResults: [[], [], [], []],
    },
];

const players = [
    ...swiss.map((m, i) => {
        m.seed = i + 1;
        return m;
    }),
];

console.log(players);

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
                    rating: p?.rating,
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
                <div className="mb-2">
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
