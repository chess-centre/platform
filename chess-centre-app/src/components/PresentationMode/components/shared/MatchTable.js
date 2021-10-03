/**
 * 
 * @param {Array} results
 * @param {Number} round
 * @param {Boolean} whiteOnOdd
 * @param {Boolean} showRating 
 * @returns React.Component
 */
const MatchTable = ({ results, round, whiteOnOdd, showRating = false }) => {
    const { homeTeam, awayTeam } = players;
    let homeScore = 0;
    let awayScore = 0;
    return (
        <div>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto border-gray-300 dark:border-gray-700 border shadow">
                <thead className="bg-teal-500 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="flex-grow-0 w-80 px-2 sm:px-4 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Home
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Vs
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-2 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        ></th>
                        <th
                            scope="col"
                            className="flex-grow-0 w-80 px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Away
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    {homeTeam.map((p, key) => {
                        const [home, away] = results.find(
                            (r) => r.round === round
                        ).pairResults[key];
                        homeScore += home ? home : 0;
                        awayScore += away ? away : 0;
                        const isEven = key % 2 === 0 ? true : false;
                        const homeColour = whiteOnOdd ? (isEven ? "W" : "B") : (isEven ? "B" : "W");
                        const awayColour = whiteOnOdd ? (isEven ? "B" : "W") : (isEven ? "W" : "B");
                        const hPlayer = p;
                        const aPlayer = awayTeam[key];
                        return (
                            <tr key={key} className="bg-white dark:bg-gray-800">
                                <td className="bg-gray-100 px-2 py-3 border-r text-xs">
                                    {key + 1}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {hPlayer.name} <span className="font-thin">{showRating && (hPlayer.rating ? hPlayer.rating : "unrated")}</span>
                                </td>
                                <td className="bg-yellow-50 px-2 py-3 border-r border-l text-xs">
                                    {homeColour}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 border-l-2 border-r-2 border-gray-100 dark:border-gray-700">
                                    {home || away
                                        ? `${home === 0.5 ? "½" : home} - ${away === 0.5 ? "½" : away
                                        }`
                                        : "? - ?"}
                                </td>
                                <td className="bg-yellow-50 px-2 py-3 border-r border-l text-xs">
                                    {awayColour}
                                </td>
                                <td className="px-2 pl-4 sm:px-4 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {aPlayer.name} <span className="font-thin">{showRating && (aPlayer.rating ? aPlayer.rating : "unrated")}</span>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm bg-white text-gray-500 border-2 border-gray-200 ">
                            {`${homeScore} - ${awayScore}`}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};