import React from "react";
import Winner from "../../../assets/img/june-congress-winner.jpeg";
import LukeJacob from "../../../assets/img/june-congress-round-4.jpeg";

export const CongressEntries = [
  {
    id: 1,
    name: "Tim Hilton",
    rating: 2005,
  },
  {
    id: 2,
    name: "Arron Barker",

    rating: 1953,
  },
  {
    id: 3,
    name: "Sam Davies",

    rating: 1908,
  },
  {
    id: 4,
    name: "Max Shaw",

    rating: 1796,
  },
  {
    id: 5,
    name: "Jacob Smith",

    rating: 1791,
  },
  {
    id: 6,
    name: "Luke Gostelow",
    rating: "",
  },
];

const SwissPairings = [
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
      pairResults: [
        [1, 0],
        [1, 0],
        [1, 0],
      ],
      round: 1,
    },
    {
      pairResults: [
        [0, 1],
        [0, 1],
        [1, 0],
      ],
      round: 2,
    },
    {
      pairResults: [
        [1, 0],
        [0.5, 0.5],
        [1, 0],
      ],
      round: 3,
    },
    {
      pairResults: [
        [1, 0],
        [1, 0],
        [0, 1],
      ],
      round: 4,
    },
    {
      pairResults: [
        [1, 0],
        [0, 1],
        [0, 1],
      ],
      round: 5,
    }
];

const players = [
  ...CongressEntries.slice(0, 6).map((m, i) => {
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
        rating: p.rating,
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

const Standings = () => {
  return (
    <div>
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
              className="px-1 sm:px-1 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Rounds
            </th>
            <th
              scope="col"
              className="relative px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
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
                  <td className="px-2 pl-2 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                    {data.name}{" "}
                    <span className="font-thin">
                      ({data.rating ? data.rating : "unrated"})
                    </span>
                  </td>
                  <td className="px-1 sm:px-1 py-4 whitespace-nowrap font-medium text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex">
                      {data.rounds.map((r) =>
                        r ? (
                          <div className="px-1">{r === 0.5 ? "½" : r}</div>
                        ) : r === 0 ? (
                          <div className="px-1">{r}</div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-2 sm:px-2 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
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
                <td className="flex-none min-w-50 px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {whitePlayer.name} <br />
                  <span className="font-thin">
                    (
                    {whitePlayer.rating
                      ? whitePlayer.rating
                      : "unrated"}
                    )
                  </span>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                  {white || black
                    ? `${white === 0.5 ? "½" : white} - ${
                        black === 0.5 ? "½" : black
                      }`
                    : "? - ?"}
                </td>
                <td className="flex-none min-w-50 px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {blackPlayer.name} <br />
                  <span className="font-thin">
                    (
                    {blackPlayer.rating
                      ? blackPlayer.rating
                      : "unrated"}
                    )
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

function MayCongress() {
  return (
    <>
      <section className="flex flex-wrap overflow-hidden">
        <div>
          <h2 className="ml-4 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center sm:text-left">
            June Open Congress 2021
          </h2>
          <p className="ml-4 mt-4 text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            Thank you to all who attended our event, below you will find
            individual results and standings.
          </p>
          <div className="ml-4 mt-4 text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            <ul>
              <li>Play-off Armageddon:{" "}
              <a
                  className="text-teal-600 hover:text-teal-700"
                  href="https://youtu.be/zvukpNyuVQY"
                >
                video
                </a>
                </li>
              <li>
                ECF results: <span className="font-semibold">submitted</span> (
                <a
                  className="text-teal-600 hover:text-teal-700"
                  href="https://ecflms.org.uk/lms/node/68985/swtable"
                >
                  details here
                </a>
                )
              </li>
            </ul>
          </div>
        </div>
        <div className="px-2 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto">
          <div className="">
            <h3 className="mb-2 text-1xl font-semibold text-gray-700 dark:text-gray-200 text-center sm:text-left">
              Final Standings
            </h3>
            <Standings></Standings>
          </div>
          <div className="text-center mt-4 sm:mt-10">
            <div className="aspect-w-3 aspect-h-2 ml-2">
              <img
                className="object-cover shadow-lg rounded-lg object-center m-auto"
                src={LukeJacob}
                alt="Luke Gostelow vs Jacob Smith"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              Round 4 <br />
              Luke Gostelow (white) vs Jacob Smith (black)
            </p>
          </div>
          <div className="text-center mt-4 sm:mt-10">
            <div className="aspect-w-3 aspect-h-2 ml-2">
              <img
                className="object-cover shadow-lg rounded-lg object-center m-auto"
                src={Winner}
                alt=""
              />
            </div>
            <p className="ml-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
              Our Winners <br /> Sam Davies (left) &amp; Tim Hilton (right)
            </p>
          </div>
        </div>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-4"></div>
      </section>
      <section className="relative mb-10">
        <h3 className="mb-2 mt-5 px-4 text-1xl font-semibold text-gray-700 dark:text-gray-200 text-center sm:text-left">
          Individual Pairings
        </h3>
        <div className="sm:px-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SwissPairings.map((pairings, key) => {
            return (
              <div key={key}>
                <PairsTable
                  format={pairings}
                  players={players}
                  results={results}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default MayCongress;
