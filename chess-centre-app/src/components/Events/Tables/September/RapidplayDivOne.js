import React from "react";
import { Standings } from "./Standings";
import { PairingsTable } from "./Pairings";
import { currentRound, showPreviousRound, showAll } from "./meta.json";

export const CongressEntries = [
  {
    id: 1,
    name: "Adam Ashton",
    ratingInfo: {
      rating: 2373,
    },
    title: "FM",
  },
  {
    id: 2,
    name: "Peter Shaw",
    ratingInfo: {
      rating: 2276,
    },
  },
  {
    id: 3,
    name: "Miles Edwards-Wright",
    ratingInfo: {
      rating: 2091,
    },
  },
  {
    id: 5,
    name: "Alan Walton",
    ratingInfo: {
      rating: 2061,
    },
  },
  {
    id: 4,
    name: "Tim Hilton",
    ratingInfo: {
      rating: 2000,
    },
  },
  {
    id: 6,
    name: "Jim Davis",
    ratingInfo: {
      rating: 1923,
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
    pairResults: [[1,0], [1,0], [1,0]],
  },
  {
    round: 2,
    pairResults: [[0, 1], [0.5, 0.5], [1,0]],
  },
  {
    round: 3,
    pairResults: [[1,0], [0,1], [0.5,0.5]],
  },
  {
    round: 4,
    pairResults: [[0,1], [1,0], [1,0]],
  },
  {
    round: 5,
    pairResults: [[1,0], [1,0], [0,1]],
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
        title: p.title ? p.title : "",
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
    <div className="grid grid-cols-2 p-4 ml-20 mt-2">
      <div className="">
        <Standings
          roundByRound={roundByRound}
          division={"Division 1 (All Play All)"}
        ></Standings>
      </div>
      { !showAll && (
                <div className="mt-6">
                    {showPreviousRound && (
                        <div className="mb-2">
                            <p className="mb-2 font-medium">Previous Round</p>
                            <PairingsTable
                                format={SixPlayerPairings[currentRound - 2]}
                                players={players}
                                results={results}
                                indexer={0}
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
                </div>) }

                { showAll && (    
                    SixPlayerPairings.map(pairings => {
                        return (<PairingsTable
                            format={pairings}
                            players={players}
                            results={results}
                            indexer={0}
                        />)
                    })
                )}
    </div>
  );
}
