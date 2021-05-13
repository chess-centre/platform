import React from "react";
import { Link } from "react-router-dom";
import { rounds } from "../../api/data.roundTimes";


export default function Rounds(props) {
  const { eventId, eventType, removeStyles, date } = props;
  const event = rounds.find(({ type }) => type === eventType);

  return (
    <div className={ removeStyles ? "" : "relative bg-white rounded-lg shadow-lg" }>
      <div className="rounded-t-lg px-6 py-2 sm:pt-8">
        <div className="relative text-lg text-gray-700">
          <h2 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
            Rounds
          </h2>
          <h3 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">{date}</h3>
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
                    {event.prizeGiving.time}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {eventId && !removeStyles ? (
            <div className="flex text-base max-w-prose mb-2 mt-2">
              <div className="rounded-md shadow mx-auto">
                <Link
                  to={`/register?eventId=${eventId}`}
                  className="w-full flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                >
                  Join Event
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {!removeStyles ? (
        <div className="relative flex items-center sm:items-start bg-teal-700 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10"></div>
      ) : null}
    </div>
  );
}
