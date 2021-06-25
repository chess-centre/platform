import React from "react";
import API from "@aws-amplify/api";

const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pairings
        results
        players
        eventID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;

const resultCheck = (pairings, players, results) => {
  console.log("Result Check");
  console.log(players);
  const resultBySeed = [];
  pairings.forEach(({ round, pairings }) => {
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

export const CurrentStandings = ({ results, players, pairings }) => {
  const { roundByRound } = resultCheck(pairings, players, results);

  return (
    <div>
      <h2 className="mb-2 text-1xl font-semibold text-center text-gray-700 dark:text-gray-200">
        Overall Standings
      </h2>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Player
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Round by Round
            </th>
            <th
              scope="col"
              className="relative px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
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
                  <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-300">
                    {data.name}{" "}
                    <span className="font-thin">
                      ({data.rating ? data.rating : "unrated"})
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-md text-gray-700 dark:text-gray-300">
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
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-md text-gray-500 dark:text-gray-300">
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

export const PairsTable = ({ format, players, results }) => {
  const { round, pairings } = format;
  return (
    <div>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-2 sm:px-4 py-2 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              White
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Vs
            </th>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Black
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="bg-white dark:bg-gray-800">
            {/* using colSpan=3 here means the header VS doesn't align center with the Round */}
            <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
            <td className="px-4 sm:px-6 py-1 text-center text-xs font-medium text-gray-900 dark:text-gray-300">
              Round {round}
            </td>
            <td className="px-4 sm:px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300"></td>
          </tr>
          {pairings.map((p, key) => {
            const [white, black] = results.find(
              (r) => r.round === round
            ).pairResults[key];
            const whitePlayer = players.find((player) => player.seed === p[0]);
            const blackPlayer = players.find((player) => player.seed === p[1]);
            return (
              <tr key={key} className="bg-white dark:bg-gray-800">
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700 dark:text-gray-300">
                  {whitePlayer.name}{" "}
                  <span className="font-thin">
                    ({whitePlayer.rating ? whitePlayer.rating : "unrated"})
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-md text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                  {white || black
                    ? `${white === 0.5 ? "½" : white} - ${
                        black === 0.5 ? "½" : black
                      }`
                    : "? - ?"}
                </td>
                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700 dark:text-gray-300">
                  {blackPlayer.name}{" "}
                  <span className="font-thin">
                    ({blackPlayer.rating ? blackPlayer.rating : "unrated"})
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

export const Internal = () => {
  const [players, setPlayers] = React.useState([]);
  const [pairings, setPairings] = React.useState([]);
  const [resultDetails, setResultDetails] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchResults = async () => {
      const {
        data: {
          listResults: { items: results },
        },
      } = await API.graphql({
        query: listResults,
      });
      try {
        const parsedResult = JSON.parse(results[0].results);
        const parsedPlayer = JSON.parse(results[0].players);
        const parsedPairings = JSON.parse(results[0].pairings);
        setResultDetails(parsedResult);
        setPlayers([
          ...parsedPlayer.map((m, i) => {
            m.seed = i + 1;
            return m;
          }),
        ]);
        setPairings(parsedPairings);
        console.log("parsedPairings", pairings[0].round);
      } catch (error) {
        console.log("Something exploded!", error);
      }
    };
    fetchResults();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-4 px-2 py-2 h-screen">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="col-span-2 bg-gray-100 rounded-lg shadow-xs">
          <h1 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
            June Congress
          </h1>
          <div className="mb-4">
            {Array.isArray(pairings) && pairings.length ? (
              <CurrentStandings
                results={resultDetails}
                players={players}
                pairings={pairings}
              ></CurrentStandings>
            ) : (
              "Loading"
            )}
          </div>
          <div className="mb-2">
          {Array.isArray(pairings) && pairings.length ? (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="pb-2">
                  <PairsTable
                    format={pairings[0]}
                    players={players}
                    results={resultDetails}
                  />
                </div>
                <div className="pb-2">
                  <PairsTable
                    format={pairings[1]}
                    players={players}
                    results={resultDetails}
                  />
                </div>
                <div className="pb-2">
                  <PairsTable
                    format={pairings[2]}
                    players={players}
                    results={resultDetails}
                  />
                </div>
              </div>
              <div>
                <div className="pb-2">
                  <PairsTable
                    format={pairings[3]}
                    players={players}
                    results={resultDetails}
                  />
                </div>
                <div className="pb-2">
                  <PairsTable
                    format={pairings[4]}
                    players={players}
                    results={resultDetails}
                  />
                </div>
              </div>
            </div>
            ) : (
              "Loading"
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Internal;
