import React, { useState, useMemo } from "react";
import { API } from "aws-amplify";
import { classNames } from "../../../utils/Classes";
import { rounds } from "../../../api/data.roundTimes";

export default function Trains({ eventId, eventType, alignLeft = true }) {
  const { eventStart, eventEnd } = rounds.find(
    ({ type }) => type === eventType
  );
  const [trainInfo, setTrainInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useMemo(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await API.post("travel", `/train/${eventId}`, {
          body: {
            eventStart,
            eventEnd,
          },
        });
        const { departures } = JSON.parse(response);
        setTrainInfo(departures?.all?.slice(0, 6));
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [eventId, eventStart, eventEnd]);

  return (
    <div className="mt-4 p-2 text-sm">
      <h1 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200 text-left">
        Departures <span className="text-xs text-gray-500">from Ilkley</span>{" "}
        <i className="fad fa-map-signs text-teal-500"></i>
      </h1>
      {trainInfo && !isLoading && !isError && (
        <div>
          <div className="overflow-auto">
            <table className="m-auto w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 divide-y divide-gray-200 dark:border-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Station
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    <span className="sm:block hidden">Platform</span>
                    <span className="block sm:hidden">Plat</span>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainInfo.map((details, key) => {
                  return (
                    <tr key={key} className={classNames(alignLeft ? "text-left" : "text-center")}>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {details.destination_name}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {details.platform}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                        {details.aimed_departure_time}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-center text-xs text-gray-400 italic sm:mr-4">
            Real-time feed provided by{" "}
            <a
              href="https://www.transportapi.com/"
              target="_blank"
              rel="noreferrer"
            >
              transportapi.com
            </a>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
          <span>
            <i className="animate-bounce fal fa-train fa-3x sm:fa-8x text-gray-200"></i>
          </span>
          <span className="mt-2 block text-sm font-medium text-teal-600">
            Checking Train times...
          </span>
        </div>
      )}

      {isError && (
        <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
          <span>
            <i className="fal fa-train fa-3x sm:fa-8x text-red-800"></i>
          </span>
          <p className="mt-2 block text-sm font-medium text-gray-600">
            Oops, unable to find train schedule.
          </p>
          <p className="mt-2 block text-sm font-medium text-gray-600">
            Check back later.
          </p>
        </div>
      )}
    </div>
  );
}
