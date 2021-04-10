import React from "react";

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
    pairResults: [
      [1, 0],
      [0.5, 0.5],
      [0, 1],
    ],
  },
  {
    round: 2,
    pairResults: [
      [0, 1],
      [0.5, 0.5],
      [0, 1],
    ],
  },
  {
    round: 2,
    pairResults: [
      [1, 0],
      [0.5, 0.5],
      [0, 1],
    ],
  },
  {
    round: 3,
    pairResults: [[], [], []],
  },
  {
    round: 4,
    pairResults: [[], [0, 1], []],
  },
  {
    round: 5,
    pairResults: [[], [], []],
  },
];

const players = [
  {
    seed: 1,
    name: "Matthew Webb",
    club: "The Chess Centre",
    about:
      "My favourite player is Bobby Fischer, followed closely by Rashid Nezhmetdinov.",
    gradingInfo: {
      ecfId: "225527D",
      grade: 247,
      type: "standard",
    },
    ratingInfo: {
      rating: 2249,
    },
  },
  {
    seed: 2,
    name: "Peter Shaw",
    gradingInfo: {
      ecfId: "166609F",
      grade: 2172,
      type: "standard",
    },
  },
  {
    seed: 3,
    name: "Andrew Wainwright",
    gradingInfo: {
      ecfId: "185834J",
      grade: 2013,
      type: "standard",
    },
  },
  {
    seed: 4,
    name: "David Barlow",
    gradingInfo: {
      ecfId: "106225G",
      grade: 2005,
      type: "standard",
    },
  },
  {
    seed: 5,
    name: "Chris Wright",
    gradingInfo: {
      ecfId: "214108F",
      grade: 1968,
      type: "standard",
    },
  },
  {
    seed: 6,
    name: "Max Shaw",
    gradingInfo: {
      ecfId: "312992F",
      grade: 2000,
      type: "standard",
    },
  },
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
      player[seed] = {
        rounds: [result],
        total: result || 0,
        name: players.find(p => p.seed === seed).name
      };
    } else {
      player[seed].rounds.push(result);
      player[seed].total += result || 0;
    }
    return player;
  }, {});
  return { resultBySeed, roundByRound };
};

const { resultBySeed, roundByRound } = resultCheck(players);

const Standings = () => {
  return (<div>
    <h2 className="mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">Standings</h2>
    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 border dark:border-gray-700 shadow">
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
            Rounds
          </th>
          <th
            scope="col"
            className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
        {
          Object.values(roundByRound).sort((a, b) => Number(b.total) - Number(a.total)).map((data, key) => {
            return (
              <tr key={key} className="bg-white dark:bg-gray-800">
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                  {data.name}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex">
                    {data.rounds.map(r => r ? <div className="px-2">{r === 0.5 ? "½" : r}</div> : r === 0 ? <div className="px-2">{r}</div> : '')}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                  {data.total}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>)
}

const CrossTable = () => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">Crosstable</h2>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Seed
            </th>
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
              Rating
            </th>
            {players.map((p, i) => {
              return (
                <th
                  key={i}
                  scope="col"
                  className="relative px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {i + 1}
                </th>
              );
            })}
            <th
              scope="col"
              className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {players.map((p, i) => {
            const idx = i + 1;
            return (
              <tr key={i} className="bg-white dark:bg-gray-800">
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-sm text-center font-normal bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 border-r-2 border-gray-100 dark:border-gray-700">
                  {idx}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-700 dark:text-gray-300">
                  {p.name}{" "}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-r-2 border-gray-100 dark:border-gray-700">
                  {p.gradingInfo.grade}
                </td>

                {players.map((row, index) => {
                  const result = resultBySeed.find(
                    (r) => r.seed === p.seed && r.opponent === row.seed
                  );
                  const isSelf = row.name === p.name;
                  return (
                    <td
                      key={index}
                      className={isSelf ? "px-6 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 py-4 whitespace-nowrap text-center text-sm font-normal" : "px-6 py-4 whitespace-nowrap dark:text-gray-300 text-center text-sm font-normal"}
                    >
                      {isSelf ? "x" : result ? result.result === 0.5 ? "½" : result.result : ""}
                    </td>
                  );
                })}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center font-medium text-sm text-gray-500 dark:text-gray-300 border-l-2 border-gray-100 dark:border-gray-700">
                  {roundByRound[p.seed].total}
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
            <td className="px-4 sm:px-6 py-1 text-center text-sm font-medium text-gray-900 dark:text-gray-300">
              Round {round}
            </td>
            <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
          </tr>
          {pairings.map((p, key) => {
            const [white, black] = results.find(
              (r) => r.round === round
            ).pairResults[key];
            return (
              <tr key={key} className="bg-white dark:bg-gray-800">
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {players.find((player) => player.seed === p[0]).name}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                  {white || black
                    ? `${white === 0.5 ? "½" : white} - ${black === 0.5 ? "½" : black
                    }`
                    : "? - ?"}
                </td>
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {players.find((player) => player.seed === p[1]).name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function AllPlayAll() {
  return (
    <>
      <section className="flex flex-wrap overflow-hidden">
        <div className="px-4 w-1/3 -mr-2 overflow-hidden">
          <Standings></Standings>
        </div>
        <div className="w-2/3 px-2 overflow-hidden">
          <CrossTable players={players} results={results}></CrossTable>
        </div>

      </section>
      <section className="relative mb-10">
        <h2 className="mb-2 mt-5 px-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">Pairings</h2>
        <div className="px-4 grid grid-cols-3 gap-4">

          {SixPlayerPairings.map((pairings, key) => {
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

export default AllPlayAll;
