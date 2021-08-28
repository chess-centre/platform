export const Standings = ({ roundByRound, division }) => {
  return (
    <div>
      <h3 className="text-2xl mb-2 -mt-4 font-semibold text-pink-900 text-center">{ division }</h3>
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
        <thead className="bg-pink-900">
          <tr>
            <th
              scope="col"
              className="px-1 py-3 text-left text-xs font-medium text-gray-50 dark:text-gray-300 uppercase tracking-wider"
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
              Rating
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
          <tr>
            <td className="px-2 py-2" colSpan="5"></td>
          </tr>
          {Object.values(roundByRound)
            .sort((a, b) => Number(b.total) - Number(a.total))
            .map((data, key) => {
              return (
                <tr key={key} className="bg-white dark:bg-gray-800">
                  <td className="bg-gray-100 border-r px-1 py-4 text-xs whitespace-nowrap text-center text-gray-800">
                    {key + 1}
                  </td>
                  <td className="px-2 pl-4 text-left sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 ">
                    {data.name}
                  </td>
                  <td className="border-r px-1 py-4 text-xs whitespace-nowrap text-center text-gray-800">
                    <span className="text-pink-700">
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