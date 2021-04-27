import React, { useEffect, useState, lazy } from "react";
import { useParams, Redirect } from "react-router-dom";
import PGNViewer from "../ChessBoard/ChessBoard";
import { games } from "../../api/mock.games";


const Page404 = lazy(() => import("../../pages/Error/404"));

function MemberProfile() {
  const { username } = useParams();
  const [memberGames, setMemberGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(0);
  const member = {};

  const profileGames = games.find((m) => m.username === username);

  const getGame = (index) => {
    if (profileGames) {
      return profileGames.games[index].pgn;
    } else {
      return "";
    }
  };

  useEffect(() => {
    // Fetch Member Info
    setTimeout(() => {
      //setMember(() => profileInfo);
      setMemberGames(() => profileGames);
    }, 100);

  }, [profileGames, username]);

  return (
    <>
      {member ? (
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="col-span-2 mr-3">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mt-5">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50">
                  Member Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Player insights
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {member.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      Club
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {member.club}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      Grade
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {member.gradingInfo ? member.gradingInfo.grade : ""}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      About
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {member.about}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      Latest Games
                    </dt>
                    <div className="flex flex-col mt-2">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-800 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:border-gray-800">
                              <thead className="bg-gray-50 dark:bg-gray-700 divide-y divide-gray-200 dark:border-gray-800">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                  >
                                    Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                  >
                                    Colour
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                  >
                                    Result
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                  >
                                    <span>Game</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-500">
                                {memberGames && memberGames.games ? (
                                  memberGames.games.map((game, i) => {
                                    const isActive = i === selectedGame;
                                    return (
                                      <tr
                                        key={i}
                                        className={
                                          isActive
                                            ? "bg-orange-50 dark:bg-teal-700"
                                            : ""
                                        }
                                      >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="ml-2">
                                              <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {game.opponent}
                                              </div>
                                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {game.event}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                          <div className="text-sm">
                                            {game.colour}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-200 text-teal-800">
                                            {game.result}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                          <button
                                            onClick={() => setSelectedGame(i)}
                                            className={
                                              isActive
                                                ? "bg-teal-600 dark:bg-pink-700 text-white cursor-not-allowed opacity-50 border border-transparent rounded-md shadow-sm py-1 px-2 inline-flex justify-center"
                                                : "bg-teal-600 border border-transparent rounded-md shadow-sm py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            }
                                          >
                                            View
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex align-center">
                                        <div className="ml-1 text-xs">
                                          No Games
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* WEB SPECIFIC */}
          <div className="hidden sm:block bg-white dark:bg-gray-800 shadow overflow-auto sm:rounded-lg m-1 p-4 mt-5">
            <PGNViewer layout={"left"}>{getGame(selectedGame)}</PGNViewer>
          </div>
          {/* MOBILE SPECIFIC */}
          <div className="block sm:hidden bg-white shadow overflow-auto p-2">
            <PGNViewer layout={"top"}>{getGame(selectedGame)}</PGNViewer>
          </div>
        </div>
      ) : (
        <Redirect component={Page404} />
      )}
    </>
  );
}

export default MemberProfile;
