/**
 * 
 * @param {Object} format
 * @param {Array} players 
 * @param {Array} results
 * @param {Number} indexer
 * @returns React.Component
 */
export const PairingsTable = ({ format, players, results, indexer }) => {
    const { round, pairings } = format;
    return (
      <div className="">
        <table className="w-full divide-y divide-gray-200 table-auto border-gray-300 border">
          <thead className="bg-yellow-400 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="flex-grow-0 w-80 px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
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
                className="flex-grow-0 w-80 px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
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
              <td className="px-2 py-1 text-center text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300">
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
                    {key + 1 + indexer}
                  </td>
                  <td className="flex-grow-0 max-w-full px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700">
                    {whitePlayer.name ? (
                      whitePlayer.name
                    ) : (
                      <span className="text-sx font-normal">TBC</span>
                    )}{" "}
                    <br />
                    <span className="font-thin text-pink-700 text-sm">
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
                  <td className="flex-grow-0 max-w-full px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-md font-medium text-gray-700">
                    {blackPlayer.name ? (
                      blackPlayer.name
                    ) : (
                      <span className="text-sx font-normal">TBC</span>
                    )}{" "}
                    <br />
                    <span className="font-thin text-pink-700 text-sm">
                      {blackPlayer.ratingInfo.rating === "blank" ? (
                        <span className="text-white">Blank</span>
                      ) : blackPlayer.ratingInfo.rating ? (
                        `${blackPlayer.ratingInfo.rating}`
                      ) : (
                        "unrated"
                      )}
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