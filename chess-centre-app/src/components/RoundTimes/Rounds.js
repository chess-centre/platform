import React from "react";
import { Link } from "react-router-dom";
import { rounds } from "../../api/data.roundTimes";

export default function Rounds(props) {
  const { eventId, eventType, removeStyles, date, isFull, isLive } = props;
  const event = rounds.find(({ type }) => type === eventType);

  return (
    <div
      className={removeStyles ? "" : "relative bg-white rounded-lg shadow-lg"}
    >
      <div className="rounded-t-lg px-6 py-2 sm:pt-8">
        <div className="relative text-lg text-gray-700">
          <h2 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
            Rounds
          </h2>
          <h3 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
            {date}
          </h3>
          <table className="m-auto min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {event &&
                event.rounds.map(({ round, time, day }, key) => {
                  return (
                    <tr key={key}>
                      <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Round {round}
                      </td>
                      <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {day}
                      </td>
                      <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {time}
                      </td>
                    </tr>
                  );
                })}
              {event && event.prizeGiving ? (
                <tr key={1000}>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Prize Ceremony
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.prizeGiving.day}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.prizeGiving.time}{" "}
                    <i className="ml-4 text-teal-600 fad fa-trophy-alt fa-2x"></i>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {eventId && !removeStyles && (
            <div className="flex text-base max-w-prose mb-2 mt-2">
              {isFull && !isLive && (
                <div className="mx-auto w-full">
                  <div className="shadow  w-full flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 ">
                    Closed
                  </div>
                </div>
              )}
              {!isFull && !isLive && (
                <div className="rounded-md shadow mx-auto w-full">
                  <Link
                    to={`/register?eventId=${eventId}`}
                    className="w-full flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                  >
                    Register
                  </Link>
                </div>
              )}
              {isLive && (
                <div className="mx-auto w-full">
                  <Link
                    to="/broadcast/live"
                    className={`mt-2 
            w-full flex items-center justify-center 
            py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:border-teal-700 
            focus:shadow-outline-teal transition duration-150 ease-in-out`}
                  >
                    <span className="flex relative h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                    </span>{" "}
                    <span className="ml-2">Watch Here</span>
                  </Link>
                </div>
              )}
            </div>
          )}
          {isFull && (
            <div className="text-xs text-gray-500 text-center">
              This event is now full.
            </div>
          )}
        </div>
      </div>
      {!removeStyles ? (
        <div className="relative flex items-center sm:items-start bg-teal-700 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10"></div>
      ) : null}
    </div>
  );
}
