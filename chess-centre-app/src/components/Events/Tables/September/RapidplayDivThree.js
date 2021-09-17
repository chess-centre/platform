import React from "react";
import { Standings } from "./Standings";
import { PairingsTable } from "./Pairings";
import { currentRound, showPreviousRound } from "./meta.json";

export const CongressEntries = [
  {
    id: 1,
    name: "Alannah Ashton",
    ratingInfo: {
      rating: 1514,
    },
  },
  {
    id: 2,
    name: "Donna Chadwick",
    ratingInfo: {
      rating: 1405,
    },
  },
  {
    id: 3,
    name: "Shriaansh Ganti",
    ratingInfo: {
      rating: 1375,
    },
  },
  {
    id: 4,
    name: "Robbie Grounds",
    ratingInfo: {
      rating: 1173,
    },
  },
  {
    id: 5,
    name: "Jack Hupton",
    ratingInfo: {
      rating: 1063,
    },
  },
  {
    id: 6,
    name: "Emlyn Hauber",
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
        <Standings
          roundByRound={roundByRound}
          division={"Division 3"}
        ></Standings>
      </div>
      <div className="text-2xl mt-4 py-2 font-semibold text-gray-700 text-left">
        <i className="far fa-caret-left text-teal-500 ml-4"></i>
      </div>
      <div className="mt-6">
      {showPreviousRound && (
          <div className="mb-2">
            <p className="mb-2 font-medium">Previous Round</p>
            <PairingsTable
              format={SixPlayerPairings[currentRound - 2]}
              players={players}
              results={results}
              indexer={6}
            />
          </div>
        )}
        <p className="mb-2 font-medium">Next Round</p>
        <PairingsTable
          format={SixPlayerPairings[currentRound - 1]}
          players={players}
          results={results}
          indexer={6}
        />
      </div>
    </div>
  );
}
