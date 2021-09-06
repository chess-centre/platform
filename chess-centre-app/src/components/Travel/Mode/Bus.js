import React, { useState, useMemo } from "react";
import { API } from "aws-amplify";

export default function Buses({ eventId }) {
  const [busInfo, setTrainInfo] = useState({});
  const [busRoadName, setBusRoadName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { departures, name } = await API.get("travel", `/bus/${eventId}`);
      setTrainInfo(departures);
      setBusRoadName(name);
      setIsLoading(false);
    };
    fetchData();
  }, [eventId]);

  return (
    <div className="mt-4 p-2 text-sm">
      <h1 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200 text-left">
         Departures <span className="text-xs text-gray-500">from Ilkley</span> <i className="fad fa-map-signs text-teal-500"></i>
      </h1>
      {busInfo && !isLoading && (
        <div>
          <div className="overflow-auto">
            <h4 className="text-sm text-gray-500 font-medium ml-1 mb-2">{ busRoadName }</h4>
            <table className="m-auto w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 divide-y divide-gray-200 dark:border-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Bus No.
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Direction
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Time(s)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(busInfo).map((buses, key) => {
                  return (
                    <tr key={key}>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {buses}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {busInfo[buses][0].direction}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {busInfo[buses].map(({ aimed }) => aimed.departure.time).join(", ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-center text-xs text-gray-400 italic sm:mr-4">
            Real-time feed provided by <a href="https://www.transportapi.com/" target="_blank" rel="noreferrer">transportapi.com</a>
          </div>
        </div>
      )}

      {isLoading && (
        <div
          className="relative block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center"
        >
          <span>
            <i className="animate-bounce fal fa-bus fa-3x sm:fa-8x text-gray-200"></i>
          </span>
          <span className="mt-2 block text-sm font-medium text-teal-500">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}