import React from "react";
import { Link, useParams } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

export default function JuniorRapidplayEvent() {
  const { id } = useParams();

  return (
    <div>
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="py-10 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              <i className="fad fa-bolt"></i> Step it up 
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Junior Rapidplay
            </p>
          </div>
          <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
            <p className="text-lg text-gray-500 text-justify">
              Want to test yourself, but don’t have time for a full weekend
              tournament? Then look no further, as our 1 day, 5 round Rapid
              Play tournaments are ideal for new and returning players who
              want to “scratch their competitive itch”, but in a more
              condensed and faster format of the game.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <div className="prose prose-teal text-gray-500 mx-auto lg:max-w-none text-justify">
                <p>
                  Our Open Rapidplay Tournaments also tend to follow our favored
                  “all-play-all” format of players competing in graded groups of
                  six, to ensure that players know they will receive a competitive
                  and challenging test of their skills across all rounds of the
                  competitions.
                </p>
                <p>
                  Though a little “less serious” by nature than congress events,
                  our Open Rapid Play Tournaments are nonetheless fully ECF Rapidplay events, and as such are competitive in nature. So if you
                  like the idea of a quick fire day of competitive Chess in Ilkley
                  then try one of our Rapidplay events.
                </p>
                <h3>Event Information</h3>
                <p>
                  Players will be placed in a group of 6, based on rating, and
                  will play all others within their group during the 5 rounds of
                  the tournament.
                </p>
                <ul>
                  <li>25 mins per player on the clock</li>
                  <li>All games will be ECF standard play graded.</li>
                  <li>Entries are limited to 12 players.</li>
                </ul>

              </div>
              <div className="text-sm text-left mt-6 hidden sm:block">
                <Link className="text-teal-600 hover:text-teal-500" to="/events"><i className="fad fa-long-arrow-alt-left"></i> back</Link>
              </div>
            </div>
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <svg
                className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                />
              </svg>
              <div className="relative bg-white rounded-lg shadow-lg">
                <div className="rounded-t-lg px-2 py-2 sm:px-10 sm:pt-8">
                  <div className="relative text-lg text-gray-700">
                    <h2 className="text-center font-bold mb-4 tracking-tight text-gray-900 mt-3 sm:mt-0">
                      Rounds
                    </h2>
                    <table className="m-auto min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Round 1
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            10:00 - 10:30
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Round 2
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            11:00 - 11:30
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Round 3
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12:00 - 12:30
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Round 4
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            13:00 - 13:30
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Round 5
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            14:00 - 14:30
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Prize Ceremony
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Saturday
                          </td>
                          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            15:00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex text-base max-w-prose mb-2 mt-2">
                      <div className="rounded-md shadow mx-auto">
                        <Link
                          to={`/register?eventId=${id}`}
                          className="w-full flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                        >
                          Join Event
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center sm:items-start bg-teal-700 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10"></div>
              </div>
              <div className="text-sm text-center mt-6 sm:hidden">
                <Link className="text-teal-600 hover:text-teal-500" to="/events"><i className="fad fa-long-arrow-alt-left"></i> back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
};