import React from "react";
import Top from "./TopSection";
import Bottom from "./BottomSection";

export const CongressEntries = [
  {
    id: 1,
    name: "Peter Shaw",
    ratingInfo: {
      rating: 2172,
    },
  },
  {
    id: 2,
    name: "David Barlow",
    ratingInfo: {
      rating: 2005,
    },
  },
  {
    id: 3,
    name: "Gary Corcoran",
    ratingInfo: {
      rating: 1878,
    },
  },
  {
    id: 4,
    name: "Andrew Wainwright",
    ratingInfo: {
      rating: 2013,
    },
  },
  {
    id: 5,
    name: "Max Shaw",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 6,
    name: "Jacob Smith",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 7,
    name: "Bob Gaunt",
    ratingInfo: {
      rating: undefined,
    },
  },
  {
    id: 8,
    name: "Steven Law",
    ratingInfo: {
      rating: undefined,
    },
  },
];

const SwissPairings = [
  {
    round: 1,
    pairings: [
      [1, 5],
      [6, 2],
      [3, 7],
      [8, 4],
    ],
  },
  {
    round: 2,
    pairings: [
      [4, 1],
      [2, 3],
      [5, 8],
      [7, 6],
    ],
  },
  {
    round: 3,
    pairings: [
      [1, 2],
      [3, 5],
      [8, 4],
      [6, 7],
    ],
  },
  {
    round: 4,
    pairings: [
      [3, 1],
      [2, 8],
      [5, 6],
      [7, 4],
    ],
  },
  {
    round: 5,
    pairings: [
      [3, 6],
      [4, 2],
      [5, 1],
      [3, 6],
    ],
  },
];

const results = [
  {
    round: 1,
    pairResults: [[1,0], [0,1], [1,0], [0,1]],
  },
  {
    round: 2,
    pairResults: [[0,1], [1,0], [1,0], [0,1]],
  },
  {
    round: 3,
    pairResults: [[1,0], [1,0], [0,1], [1,0]],
  },
  {
    round: 4,
    pairResults: [[], [], [], []],
  },
  {
    round: 5,
    pairResults: [[], [], [], []],
  }
];

const players = [
  ...CongressEntries.slice(0, 8).map((m, i) => {
    m.seed = i + 1;
    return m;
  }),
];

const resultCheck = () => {
  const resultBySeed = [];
  SwissPairings.forEach(({ round, pairings }) => {
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
        rating: p.ratingInfo.rating
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

const CurrentStandings = () => {
  return (
    <div>
      <h2 className="mb-2 text-1xl font-semibold text-center text-gray-700 dark:text-gray-200">
        Standings
      </h2>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Player
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Round by Round
            </th>
            <th
              scope="col"
              className="relative px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {Object.values(roundByRound)
            .sort((a, b) => Number(b.total) - Number(a.total))
            .map((data, key) => {
              return (
                <tr key={key} className="bg-white dark:bg-gray-800">
                  <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                    {data.name} <span className="font-thin">({data.rating ? data.rating : "unrated"})</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex">
                      {data.rounds.map((r) =>
                        r ? (
                          <div className="px-2">{r === 0.5 ? "½" : r}</div>
                        ) : r === 0 ? (
                          <div className="px-2">{r}</div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                    {data.total}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const PairsTable = ({ format, players, results }) => {
  const { round, pairings } = format;
  return (
    <div>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              White
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Vs
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Black
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="bg-white dark:bg-gray-800">
            {/* using colSpan=3 here means the header VS doesn't align center with the Round */}
            <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
            <td className="px-4 sm:px-6 py-1 text-center text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300">
              Round {round}
            </td>
            <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
          </tr>
          {pairings.map((p, key) => {
            const [white, black] = results.find(
              (r) => r.round === round
            ).pairResults[key];
            const whitePlayer = players.find((player) => player.seed === p[0]);
            const blackPlayer = players.find((player) => player.seed === p[1])
            return (
              <tr key={key} className="bg-white dark:bg-gray-800">
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {whitePlayer.name} <span className="font-thin">({whitePlayer.ratingInfo.rating ? whitePlayer.ratingInfo.rating : "unrated"})</span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                  {white || black
                    ? `${white === 0.5 ? "½" : white} - ${
                        black === 0.5 ? "½" : black
                      }`
                    : "? - ?"}
                </td>
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {blackPlayer.name} <span className="font-thin">({blackPlayer.ratingInfo.rating ? blackPlayer.ratingInfo.rating : "unrated"})</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* 
 * This view pulls in three key components:
    1) the local iframe for internal DGT boards
    2) the current table / standings for the event
    3) relevant QR code for smartphones to pull up the games on their phone
*/

const Internal = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
        <Top />
      </div>
      <div>
        <Bottom />
      </div>
      
    </div>
  );
};

export default Internal;
