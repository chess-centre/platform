export const Standings = ({ roundByRound, division, icon }) => {
  console.log(icon);
  return (
    <>
      <div className="bg-cool-gray-900 py-4 border-2 border-gray-700  sm:leading-none shadow-md">
        <p>
          <i className={`${icon} text-teal-400 text-6xl`}></i>
        </p>
        <h3 className="text-white font-bold text-md mt-2">
          {division}
        </h3>
      </div>

      <div className="inline-block border border-cool-gray-900 shadow-2xl">
        <table className="w-full divide-y divide-cool-gray-900">
          <thead className="bg-orange-brand">
            <tr>
              <th
                scope="col"
                className="px-1 py-3 text-left text-xs font-medium text-orange-900  uppercase tracking-wider"
              >
                Pos.
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900  uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900  uppercase tracking-wider"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-orange-900  uppercase tracking-wider"
              >
                Rd by Rd
              </th>
              <th
                scope="col"
                className="relative px-6 py-3 text-center text-xs font-medium text-orange-900  uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-cool-gray-900">
            <tr>
              <td className="px-1 py-1 border-cool-gray-700" colSpan="5"></td>
            </tr>
            {Object.values(roundByRound)
              .sort((a, b) => Number(b.total) - Number(a.total))
              .map((data, key) => {
                const isEven = key % 2 === 0;

                return (
                  <tr
                    key={key}
                    className={isEven ? "bg-cool-gray-800" : "bg-cool-gray-900"}
                  >
                    <td className="border-r border-cool-gray-700 px-1 py-2 text-xs whitespace-nowrap text-center text-gray-50">
                      {key + 1}
                    </td>
                    <td className="px-2 pl-4 text-left sm:px-4 py-2 whitespace-nowrap text-md font-medium text-white">
                      {data.title && (
                        <span className="mr-1 text-yellow-400 font-bold">
                          {data.title}
                        </span>
                      )}{" "}
                      {data.name}
                    </td>
                    <td className="border-r border-cool-gray-700 px-1 py-2 text-xs whitespace-nowrap text-center text-white">
                      <span className="text-teal-400 font-medium">
                        {data.rating ? data.rating : "unrated"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-2 whitespace-nowrap font-medium text-sm text-gray-700">
                      <div className="flex">
                        {data.rounds.map((r, idx) =>
                          r ? (
                            <div key={idx} className="px-2 w-7">
                              {r === 0.5 ? (
                                <span className="text-gray-500">½</span>
                              ) : (
                                <span className="text-green-500">{r}</span>
                              )}
                            </div>
                          ) : r === 0 ? (
                            <div key={idx} className="px-2 w-7">
                              <span className="text-red-500">{r}</span>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-2 whitespace-nowrap text-center font-bold text-gray-100">
                      {data.total}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
