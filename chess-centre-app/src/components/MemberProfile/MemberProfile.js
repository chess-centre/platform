import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PGNViewer from "../ChessBoard/ChessBoard";

function MemberProfile() {
  const { memberId } = useParams();
  const [member, setMember] = useState({});
  const [selectedGame, setSelectedGame] = useState(0);

  // TO BE MOVE TO BACKEND
  const games = [
    {
      opponent: "Merry, Alan B",
      event: "Scarborough Congress 2017",
      result: "Win",
      colour: "Black",
      date: "2017.10.22",
      pgn: `[Event "Scarborough Congress 2017"]
      [Site "Scarborough ENG"]
      [Round "5.1"]
      [Date "2017.10.22"]
      [White "Merry, Alan B"]
      [Black "Webb, Matthew"]
      [WhiteElo "2422"]
      [BlackElo "2249"]
      [Result "0-1"]
       1.e4 e5 2.Bc4 Nc6 3.Nc3 Bc5 4.Qg4 Qf6 5.Nd5 Qxf2+ 6.Kd1 Kf8 7.Nh3 h5 8.Qg5 Qd4 9.d3 Be7 10.Qg3 Nf6 11.c3 Qc5 12.Rf1 Nxe4 13.Nxe7 d5 14.Qg6 Qxe7 15.dxe4 dxc4 16.Ng5 Nd8 17.Kc2 Kg8 18.Nxf7 Nxf7 19.Rf2 Qe6 20.Qg3 Bd7 21.Be3 Ba4+ 22.b3 cxb3+ 23.Kb2 bxa2 24.Raf1 Qb3+ 25.Ka1 Qxc3+ 26.Kxa2 Bb3+ 27.Kb1 Bc4 28.Rxf7 Bxf7 0-1
      `,
    },
    {
      opponent: "Burrows, Martin P",
      event: "4NCL 2016-17",
      result: "Win",
      colour: "Black",
      date: "2017.5.1",
      pgn: `[Event "4NCL 2016-17"]
    [Site "Telford ENG"]
    [Round "11.28"]
    [Date "2017.5.1"]
    [White "Burrows, Martin P"]
    [Black "Webb, Matthew"]
    [WhiteElo "2122"]
    [BlackElo "2225"]
    [Result "0-1"]
    1.e4 e5 2.Nf3 Nc6 3.Bb5 f5 4.d3 fxe4 5.dxe4 Nf6 6.O-O Bc5 7.Nc3 d6 8.Bg5 O-O 9.Nd5 Kh8 10.Nh4 Be6 11.Bxf6 Rxf6 12.Nxf6 Qxf6 13.Nf5 Bxf5 14.exf5 Qxf5 15.Bxc6 bxc6 16.Qe2 e4 17.Rab1 a5 18.c3 d5 19.b4 Bd6 20.bxa5 Qe5 21.g3 Bc5 22.Rb3 Kg8 23.a6 Bb6 24.Kg2 Rf8 25.a4 Qe7 26.Rb4 Qc5 27.Rb3 Rf3 28.Qb2 h5 29.Rxb6 cxb6 30.a7 Qa5 31.c4 Qxa7 32.cxd5 cxd5 33.Qb5 Qf7 34.Qxb6 Kh7 35.Qd4 Qf5 36.Qd1 h4 37.a5 h3+ 38.Kg1 Rd3 39.Qe2 Rd2 40.Qe3 d4 41.Qf4 Qxf4 42.gxf4 Ra2 43.Rd1 Rxa5 44.Kf1 Ra4 45.Rb1 d3 46.Ke1 Kg6 47.Rb5 Ra1+ 48.Kd2 Rf1 49.f5+ Kg5 0-1
    `,
    },
    {
      opponent: "Steil-Antoni, Fiona",
      event: "4NCL 2016-17",
      result: "Win",
      colour: "White",
      date: "2017.4.30",
      pgn: `[Event "4NCL 2016-17"]
    [Site "Telford ENG"]
    [Round "10.18"]
    [Date "2017.4.30"]
    [White "Webb, Matthew"]
    [Black "Steil-Antoni, Fiona"]
    [WhiteElo "2225"]
    [BlackElo "2155"]
    [Result "1-0"]
    1.c4 e5 2.g3 Nc6 3.Bg2 f5 4.Nc3 Nf6 5.e3 g6 6.d4 e4 7.f3 exf3 8.Nxf3 d6 9.O-O Bg7 10.d5 Ne5 11.Nxe5 dxe5 12.e4 O-O 13.Be3 Ng4 14.Bc5 Rf7 15.exf5 gxf5 16.h3 b6 17.hxg4 bxc5 18.gxf5 Bxf5 19.Be4 Qg5 20.Qd3 Raf8 21.Bxf5 Rxf5 22.Rxf5 Rxf5 23.Ne4 Qg4 24.Kg2 Bf8 25.Rf1 Rxf1 26.Kxf1 Qh3+ 27.Kg1 Be7 28.Nf2 Qh5 29.Kg2 Qg5 30.Qf3 h5 31.Ne4 Qg6 32.Kf2 Kg7 33.Ke2 Qa6 34.Qc3 Bf6 35.a3 Qb6 36.b3 a5 37.Qf3 Be7 38.Qxh5 Qxb3 39.Qxe5+ Kf7 40.Qh5+ Kg7 41.Qg4+ Kh8 42.Nd2 Qb8 43.Qg6 Bf8 44.g4 Qb2 45.Qh5+ Kg8 46.Qg5+ Kf7 47.Qf5+ Ke7 48.Qf4 Qb6 49.Qg5+ Kf7 50.Qh5+ Kg8 51.g5 Bg7 52.Qe8+ Kh7 53.Qe4+ Kh8 54.Qe6 Qb8 55.Kf3 Qf8+ 56.Kg4 Qf2 57.Qc8+ Bf8 58.Nf3 Kg8 59.Qxc7 Qg2+ 60.Kf4 Qe2 61.g6 Bh6+ 62.Kg3 1-0
    `,
    },
  ];

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
      <div className="hidden sm:block bg-white shadow overflow-auto sm:rounded-lg m-1 p-4 mt-5 ml-4">
        <PGNViewer layout={"left"}>{getGame(selectedGame)}</PGNViewer>
      </div>
      { /* MOBILE SPECIFIC */ }
      <div className="block sm:hidden bg-white shadow overflow-hidden mt-2 sm:m-4 p-6">
        <PGNViewer layout={"top"}>{getGame(selectedGame)}</PGNViewer>
      </div>
    </div>
  );
}

export default MemberProfile;
