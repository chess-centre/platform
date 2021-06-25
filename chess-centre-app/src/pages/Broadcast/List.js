import React from "react";
import API from "@aws-amplify/api";
import { Link } from "react-router-dom"

export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        live
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

const List = () => {
  const [liveResults, setLiveResults] = React.useState([]);
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
      setLiveResults(results);
    };
    fetchResults();
    setIsLoading(false);
  }, []);

  return (
    <div className="mt-10">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-300 border dark:border-gray-700 shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Event
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Player Count
            </th>
            <th
              scope="col"
              className="relative py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Live
            </th>
            <th
              scope="col"
              className="relative py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Visit
            </th>
          </tr>
        </thead>
        {isLoading ? (
          "Loading..."
        ) : (
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {liveResults.map((data, key) => {
              return (
                <tr key={key} className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-md text-gray-700 dark:text-gray-300">
                    {data.name}
                  </td>
                  <td className="px-4 sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-300">
                    {data.id}
                  </td>
                  <td className="px-4 sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-300">
                    {data.eventId}
                  </td>
                  <td className="px-4 sm:px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-300">
                    0
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-left text-md text-gray-500 dark:text-gray-300">
                    {data.live ? (
                      <span className="text-teal-500">
                        <i className="fas fa-broadcast-tower"></i>
                      </span>
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </td>
                  <th
                    scope="col"
                    className="relative py-3 text-left text-md font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="">
                    <Link to={`/internal/live/${data.id}`}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >View</Link>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default List;
