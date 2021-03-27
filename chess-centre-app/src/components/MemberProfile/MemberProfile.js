import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PGNViewer from "../ChessBoard/ChessBoard";
import { games } from "../../api/mock.games";

function MemberProfile() {
  const { memberId } = useParams();
  const [member, setMember] = useState({});
  const [selectedGame, setSelectedGame] = useState(0);

  const getGame = (id) => {
    return games[id].pgn;
  };

  useEffect(() => {
    // Fetch Member Info
    setTimeout(() => {
      setMember((member) => ({
        ...member,
        // EXAMPLE RESPONSE:
        name: "Matthew Webb",
        grade: 247,
        rating: 2249,
        club: "The Chess Centre",
        about:
          "My favourite player is Bobby Fischer, followed closely by Rashid Nezhmetdinov.",
        // GET GAMES OF PLAYER
      }));
    }, 100);
    // Ensure is a signed in user

    // Any subsciber required data
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Member Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Player insights
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Club</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.club}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grade</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.grade}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.about}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Latest Games
                </dt>
                <div className="flex flex-col mt-2">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Colour
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Result
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <span>Game</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {games.map((game, i) => (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-2">
                                      <div className="text-sm font-medium text-gray-900">
                                        {game.opponent}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {game.event}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm">{game.colour}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {game.result}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a
                                    onClick={() => setSelectedGame(i)}
                                    className="text-teal-600 hover:text-teal-900"
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ))}
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
      { /* WEB SPECIFIC */ }
      <div className="hidden sm:block bg-white shadow overflow-auto sm:rounded-lg m-1 p-4 mt-5">
        <PGNViewer layout={"left"}>{getGame(selectedGame)}</PGNViewer>
      </div>
      { /* MOBILE SPECIFIC */ }
      <div className="block sm:hidden bg-white shadow overflow-hidden p-2">
        <PGNViewer layout={"top"}>{getGame(selectedGame)}</PGNViewer>
      </div>
    </div>
  );
}

export default MemberProfile;
