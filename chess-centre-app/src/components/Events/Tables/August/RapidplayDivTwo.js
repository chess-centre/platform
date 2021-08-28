import React from "react";
import { Standings } from "./Standings";
import { PairingsTable } from "./Pairings";

export const CongressEntries = [
  {
    id: 1,
    name: "Andy Ross",
    ratingInfo: {
      rating: 1660,
    },
  },
  {
    id: 2,
    name: "Max Shaw",
    ratingInfo: {
      rating: 1605,
    },
  },
  {
    id: 3,
    name: "Yassine Abbazi",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 4,
    name: "Donna Chadwick",
    ratingInfo: {
      rating: 1475,
    },
  },
  {
    id: 5,
    name: "Elliot Barnett",
    ratingInfo: {
      rating: 1330,
    },
  },
  {
    id: 6,
    name: "Oleg Kungurovs",
    ratingInfo: {
      rating: undefined,
    },
  },
];

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
    pairResults: [[], [], []],
  },
  {
    round: 2,
    pairResults: [[], [], []],
  },
  {
    round: 3,
    pairResults: [[], [], []],
  },
  {
    round: 4,
    pairResults: [[], [], []],
  },
  {
    round: 5,
    pairResults: [[], [], []],
  },
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
    <div className="grid grid-cols-1 p-4">
      <div className="">
        <Standings roundByRound={roundByRound} division={"Division 2"}></Standings>
      </div>
      <div className="text-2xl mt-4 py-2 font-semibold text-teal-700 text-center bg-yellow-50 rounded-lg border">Next Round @ 10:00am</div>
      <div className="mt-6">
          <PairingsTable
            format={SixPlayerPairings[0]}
            players={players}
            results={results}
          />
      </div>
    </div>
  );
}
