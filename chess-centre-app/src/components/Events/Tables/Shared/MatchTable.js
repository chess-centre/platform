export const MatchTable = ({
    teams,
    results,
    round,
    whiteOnOdd,
    showRating = true,
    isLive = true,
  }) => {
    const homeTeam = teams.homeTeam.players;
    const awayTeam = teams.awayTeam.players;
  
    const homeRatingAverage = Math.floor(
      homeTeam.reduce((pre, cur) => (pre += cur.rating), 0) /
        (homeTeam.length - 1)
    );
    const awayRatingAverage = Math.floor(
      awayTeam.reduce((pre, cur) => (pre += cur.rating), 0) / awayTeam.length
    );
  
    let homeScore = 0;
    let awayScore = 0;
    return (
      <div className="inline-block">
        <table className="w-full divide-y divide-cool-gray-900">
          <thead className="bg-orange-brand">
            <tr>
              <th className="px-2 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider">
                Brd.
              </th>
              <th className="px-1 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider"></th>
              <th className="flex-grow-0 w-80 px-2 sm:px-4 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider">
                The Chess Centre
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider"></th>
              <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-orange-900  uppercase tracking-wider">
                Vs
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider"></th>
  
              <th className="flex-grow-0 w-80 px-4 sm:px-6 py-3 text-center text-xs font-medium text-orange-900 uppercase tracking-wider">
                Hammersmith
              </th>
              <th className="px-1 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider"></th>
              <th className="px-2 py-2 text-center text-xs font-medium text-orange-900 uppercase tracking-wider">
                Brd.
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-cool-gray-900">
            <tr>
              <td className="px-1 py-1 border-cool-gray-700" colSpan="9"></td>
            </tr>
            {homeTeam.map((p, key) => {
              const [home, away] = results.find(
                (r) => r.round === round
              ).pairResults[key];
              homeScore += home ? home : 0;
              awayScore += away ? away : 0;
              const isEven = key % 2 === 0 ? true : false;
              const homeColour = whiteOnOdd
                ? isEven
                  ? "W"
                  : "B"
                : isEven
                ? "B"
                : "W";
              const awayColour = whiteOnOdd
                ? isEven
                  ? "B"
                  : "W"
                : isEven
                ? "W"
                : "B";
              const hPlayer = p;
              const aPlayer = awayTeam[key];
              return (
                <tr
                  key={key}
                  className={
                    isEven
                      ? "bg-cool-gray-800 hover:bg-pink-900 hover:opacity-90 text-white"
                      : "bg-cool-gray-900 hover:bg-pink-900 hover:opacity-90 text-white"
                  }
                >
                  <td className="px-1 py-3 border-r border-cool-gray-700 text-xs">
                    {key + 1}
                  </td>
                  <td className="px-1 py-3 border-r border-cool-gray-700 text-xs">
                    {homeColour === "W" ? (
                      <i className="fas fa-chess-pawn-alt"></i>
                    ) : (
                      <i className="fas fa-chess-pawn-alt text-black"></i>
                    )}
                  </td>
                  <td
                    className={
                      homeColour === "W"
                        ? "pl-4 px-4 py-2 whitespace-nowrap text-center text-white text-lg font-medium border-r border-cool-gray-700"
                        : "pl-4 px-4 py-2 whitespace-nowrap text-center text-gray-400 text-lg font-medium border-r border-cool-gray-700"
                    }
                  >
                    {hPlayer.name}
                  </td>
                  <td className=" px-2 py-3 border-r text-lg border-cool-gray-700 text-teal-400">
                    {showRating && (hPlayer.rating ? hPlayer.rating : "unrated")}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-center text-md  border-r border-cool-gray-700 ">
                    {home || away ? (
                      `${home === 0.5 ? "½" : home} - ${
                        away === 0.5 ? "½" : away
                      }`
                    ) : isLive ? (
                      <span className="text-orange-brand animate-pulse">
                        Live
                      </span>
                    ) : (
                      "? - ?"
                    )}
                  </td>
                  <td className="px-2 py-3 border-l text-lg border-r text-teal-400 border-cool-gray-700">
                    {showRating && (aPlayer.rating ? aPlayer.rating : "unrated")}
                  </td>
                  <td
                    className={
                      awayColour === "W"
                        ? "pl-4 px-4 py-2 whitespace-nowrap text-center text-gray-400 text-lg font-medium border-r border-cool-gray-700"
                        : "pl-4 px-4 py-2 whitespace-nowrap text-center text-white text-lg font-medium border-r border-cool-gray-700"
                    }
                  >
                    {aPlayer.name}
                  </td>
                  <td className="px-1 py-3 border-l text-xs border-r border-cool-gray-700">
                    {awayColour === "W" ? (
                      <i className="fas fa-chess-pawn-alt"></i>
                    ) : (
                      <i className="fas fa-chess-pawn-alt text-black"></i>
                    )}
                  </td>
                  <td className="px-1 py-3 border-r border-cool-gray-700 text-xs">
                    {key + 1}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className="px-1 py-1 border-cool-gray-700" colSpan="9"></td>
            </tr>
            <tr className="bg-cool-gray-700">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <span className="inline-flex items-center px-4 py-2 rounded text-xs font-medium bg-cool-gray-800 border-2 border-teal-600 text-gray-300">
                  Av. {homeRatingAverage}
                </span>
              </td>
              <td className="px-4 py-2 text-center text-4xl font-medium text-black border border-cool-gray-900 bg-teal-brand">
                {`${homeScore} - ${awayScore}`}
              </td>
              <td>
                <span className="inline-flex items-center px-4 py-2 rounded text-xs font-medium bg-cool-gray-800 border-2 border-teal-600 text-gray-300">
                  Av. {awayRatingAverage}
                </span>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };