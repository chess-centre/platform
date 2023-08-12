import React, { useState } from "react";
import { Link } from "react-router-dom";
import { rounds } from "../../api/data.roundTimes";

export default function Rounds(props: any) {
  const { eventId, eventType, removeStyles, isFull, isLive, isClosed, showSections, sections } = props;
  const event = rounds.find(({ type }) => type === eventType);
  const [section, setSection] = useState("open");

  const registerUrl = `/register?eventId=${eventId}${showSections ? "&section=" + section : ""}`;

  return (
    <div
      className={removeStyles ? "" : "relative bg-white rounded-lg shadow-lg"}
    >
      <div className="rounded-t-lg px-6 py-2 sm:pt-8">
        <div className="relative text-lg text-gray-700">
          <h2 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
            Playing Schedule
          </h2>
          <table className="m-auto min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {event &&
                event.rounds.map(({ round, time, day }, key) => {
                  return (
                    <React.Fragment key={key}>
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
                <tr>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Prize Ceremony
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.prizeGiving.day}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="">{event.prizeGiving.time}</span>
                    <i className="ml-4 -mt-2 text-yellow-500 fas fa-trophy-alt fa-2x"></i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {
            showSections &&
            <div className="my-4">
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 text-center">
                Select your section
              </label>
              <select
                onChange={e => setSection(e.target.value.toLocaleLowerCase())}
                id="section"
                name="section"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm rounded-md"
                defaultValue="Open"
              >
                {sections && sections.map(({ name, ratingBand }) => (
                  <option value={name}>
                    {name} {ratingBand}
                  </option>)
                )}
              </select>
            </div>
          }

          {isFull && (
            <div className="text-sm text-gray-400 text-center bg-gray-100 py-2 rounded-lg">
              Event Full
            </div>
          )}

          {!isFull && isClosed && (
            <div className="text-sm text-gray-400 text-center bg-gray-100 py-2 rounded-lg">
              Entries Closed
            </div>
          )}

          {eventId && !removeStyles && (
            <div className="flex text-base max-w-prose mb-2 mt-2">
              {(isFull || isClosed) && !isLive && (
                <div className="mx-auto w-full">
                  <div className="shadow  w-full flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 ">
                    Closed
                  </div>
                </div>
              )}
              {!isFull && !isLive && !isClosed && (
                <div className="rounded-md shadow mx-auto w-full">
                  <Link
                    to={registerUrl}
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
            py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:border-yellow-700 
            focus:shadow-outline-yellow transition duration-150 ease-in-out`}
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
        </div>
      </div>
      {!removeStyles && (
        <div className="relative flex items-center sm:items-start bg-gray-100 rounded-b-lg not-italic py-2 px-6 sm:pl-12 sm:pr-10"></div>
      )}
    </div>
  );
}
