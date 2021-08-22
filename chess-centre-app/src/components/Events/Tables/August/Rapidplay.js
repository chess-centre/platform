import React from "react";
import QR from "../../../../assets/img/QR-live-games.png";

export const CongressEntries = [
  {
    id: 1,
    name: "Timothy Spanton",
    ratingInfo: {
      rating: 1998,
    },
  },
  {
    id: 2,
    name: "Sam Davies",
    ratingInfo: {
      rating: 1944,
    },
  },
  {
    id: 3,
    name: "Joe Varley",
    ratingInfo: {
      rating: 1830,
    },
  },
  {
    id: 4,
    name: "Kevin Winter",
    ratingInfo: {
      rating: 1782,
    },
  },
  {
    id: 5,
    name: "Jacob Smith",
    ratingInfo: {
      rating: 1577,
    },
  },
  {
    id: 6,
    name: "Tom Hobbs",
    ratingInfo: {
      rating: 0,
    },
  },
  {
    id: 7,
    name: "Andrew Wainwright",
    ratingInfo: {
      rating: 2010,
    },
  },
  {
    id: 4,
    name: "Gawain Ako",
    ratingInfo: {
      rating: 1942,
    },
  }
];

const SwissPlayerPairings = [
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
      [6, 4],
      [8, 7],
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
      [1, 6],
      [4, 2],
      [3, 8],
      [5, 7],
    ],
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
      [4, 1],
      [3, 2],
      [6, 7],
      [5, 8]
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
    pairResults: [
      [1,0],
      [1,0],
      [1,0],
    ],
  },
  {
    round: 2,
    pairResults: [
      [0,1],
      [0,1],
      [0.5,0.5],
    ],
  },
  {
    round: 3,
    pairResults: [
      [0,1],
      [0,1],
      [1,0],
    ],
  },
  {
    round: 4,
    pairResults: [
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

export const Standings = () => {
  return (
    <div>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
        <thead className="bg-pink-900">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-50 dark:text-gray-300 uppercase tracking-wider"
            >
              Pos.
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-50 dark:text-gray-300 uppercase tracking-wider"
            >
              Player
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-50 dark:text-gray-300 uppercase tracking-wider"
            >
              Round by Round
            </th>
            <th
              scope="col"
              className="relative px-6 py-3 text-center text-xs font-medium text-gray-50 dark:text-gray-300 uppercase tracking-wider"
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
                  <td className="px-2 py-4 whitespace-nowrap text-center text-gray-800">
                    {key + 1}
                  </td>
                  <td className="px-2 pl-4 text-left sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 ">
                    {data.name}{" "}
                    <span className="font-thin text-pink-700">
                      {data.rating ? data.rating : "unrated"}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-700 ">
                    <div className="flex">
                      {data.rounds.map((r, idx) =>
                        r ? (
                          <div key={idx} className="px-2">
                            {r === 0.5 ? "½" : r}
                          </div>
                        ) : r === 0 ? (
                          <div key={idx} className="px-2">
                            {r}
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center font-bold text-gray-800">
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
    <div className=" shadow-md rounded-lg">
      <table className="w-full divide-y divide-gray-200 table-auto border-gray-300 border">
        <thead className="bg-teal-500 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            ></th>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              White
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Vs
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
            >
              Black
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="bg-white dark:bg-gray-800">
            {/* using colSpan=3 here means the header VS doesn't align center with the Round */}
            <td className="px-2 py-3"></td>
            <td className="px-2 sm:px-6 py-3"></td>
            <td className="px-4 sm:px-6 py-1 text-center text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300">
              Round {round}
            </td>
            <td className="px-2"></td>
          </tr>
          {pairings.map((p, key) => {
            const [white, black] = results.find(
              (r) => r.round === round
            ).pairResults[key];
            const whitePlayer = players.find((player) => player.seed === p[0]);
            const blackPlayer = players.find((player) => player.seed === p[1]);
            return (
              <tr key={key} className="bg-white dark:bg-gray-800">
                <td className="bg-gray-100 px-2 py-3 border-r text-xs">
                  {key + 1}
                </td>
                <td className="flex-none min-w-50 px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700">
                  {whitePlayer.name ? whitePlayer.name : <span className="text-sx font-normal">TBC</span> } <br />
                  <span className="font-thin text-pink-700">
                    {whitePlayer.ratingInfo.rating === "blank"
                      ? ""
                      : whitePlayer.ratingInfo.rating
                      ? `${whitePlayer.ratingInfo.rating}`
                      : "unrated"}
                  </span>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                  {white || black
                    ? `${white === 0.5 ? "½" : white} - ${
                        black === 0.5 ? "½" : black
                      }`
                    : "? - ?"}
                </td>
                <td className="flex-none min-w-50 px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700">
                  {blackPlayer.name ? blackPlayer.name : <span className="text-sx font-normal">TBC</span> } <br />
                  <span className="font-thin text-pink-700">
                    {blackPlayer.ratingInfo.rating === "blank"
                      ? <span className="text-white">Blank</span>
                      : blackPlayer.ratingInfo.rating
                      ? `${blackPlayer.ratingInfo.rating}`
                      : "unrated"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mockPlayers = [
  ...[[], [], [], [], [], [], [], []].map((m, i) => {
    m.name = "";
    m.ratingInfo = {
      rating: "blank",
    };
    m.seed = i + 1;
    return m;
  }),
];

const mockResults = [
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

const mockPairings = [
  {
    round: 1,
    pairings: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  {
    round: 2,
    pairings: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  {
    round: 3,
    pairings: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  {
    round: 4,
    pairings: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  {
    round: 5,
    pairings: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
];

export default function Rapidplay() {
  return (
    <div>
      <div className="grid grid-rows-3 grid-cols-3 gap-4">
        <div className="mt-6 col-span-1">
          <div className="text-centre text-md text-teal-600">
              Previous Round 
          </div>
          <div className="mt-2">
            <PairsTable
              format={SixPlayerPairings[2]}
              players={players}
              results={results}
            />
          </div>
          {/* <div className="mt-2">
            <PairsTable
              format={mockPairings[1]}
              players={mockPlayers}
              results={mockResults}
            />
          </div> */}
        </div>
        <div className="mt-6 col-span-1">
        <div className="text-centre text-md text-teal-600">
              Next Round 
          </div>
          <div className="mt-2">
            <PairsTable
              format={SixPlayerPairings[3]}
              players={players}
              results={results}
            />
          </div>
          {/* <div className="mt-2">
            <PairsTable
              format={mockPairings[3]}
              players={mockPlayers}
              results={mockResults}
            />
          </div> */}
        </div>

        <div className="row-span-3">
          <div className="mt-6 text-centre text-md text-teal-600">
              Overall
          </div>
          <div className="mt-2">
            <Standings></Standings>
          </div>
          <img className="h-80 mx-auto mt-12 object-center" alt="QR" src={QR} />
        </div>
        <div className="mt-2 col-span-2 row-span-3">
          {/* <iframe width="100%" height="100%" src="http://192.168.1.248:1982/liveviewer/index.html" /> */}
          <div className="mt-10 text-centre text-3xl ">
              General info
          </div>
          <div className="mt-5 text-centre text-2xl text-teal-600">
              Round 4 
          </div>
          <div className="mt-5 text-centre text-8xl">
              10:00am
          </div>
          <div className="mt-10 text-centre text-2xl text-teal-600">
              Round 5 
          </div>
          <div className="mt-5 text-centre text-8xl">
              12:30pm
          </div>
        </div>
      </div>
    </div>
  );
}
