import React from "react";
import { rounds } from "../../api/data.roundTimes";

export default function Rounds(props: any) {
  const { eventType } = props;
  const event = rounds.find(({ type }) => type === eventType);

  return (
    <div>
      <div className="rounded-t-lg pt-4 sm:pt-8 overflow-x-auto">
        <div className="relative text-lg text-gray-700">
          <table className="m-auto min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {event &&
                event.rounds.map(({ round, time, day }, key) => {
                  return (
                    <React.Fragment key={key}>
                      <tr key={key} className="text-xs sm:text-sm">
                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          Round {round}
                        </td>
                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                          {day}
                        </td>
                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                          {time}
                        </td>
                      </tr>
                      {event.break && event.break.afterRound === round && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-2 text-center whitespace-nowrap text-xs font-medium text-gray-400"
                          >
                            Lunch Break
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              {event && event.prizeGiving && (
                <tr className="text-xs sm:text-sm">
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    Prize Ceremony
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                    {event.prizeGiving.day}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                    <span className="">{event.prizeGiving.time}</span>
                    <i className="ml-4 -mt-2 text-teal-600 fas fa-trophy-alt fa-2x"></i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
