import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@aws-amplify/api";
import { listGames } from "../../graphql/queries";
import PGNViewer from "../../components/ChessBoard/ChessBoard";

export default function GamesView() {

  const { memberId } = useParams();
  const [games, setGames] = useState([]);
  const [game, selectedGame] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const {
        data: {
          listGames: {
            items
          }
        }
      } = await API.graphql({ query: listGames, filter: { memberID: { "eq": memberId } }});
      
      setGames(items);
      selectedGame(items[0]?.pgn);
      console.log(game);
      console.log(games);
    };
    fetchGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <span className="text-teal-600"><i className="fas fa-chess-king"></i></span> Games
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here are competitive games played by our members in official events
          </p>
        </div>
      </div>
      <div className="bg-white px-2 sm:mt-6 max-w-7xl mx-auto lg:px-10 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 py-6 sm:py-10">
            <div>
              <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
                List
              </h2>
              <div className="text-center sm:text-left text-base max-w-xl mt-5 mx-auto sm:text-md text-gray-500 md:pr-4">
                  <ol>
                    {
                      games.map(g => <li>{g.memberID}</li>)
                    }
                  </ol>
              </div>
            </div>
            <div>
              <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
                Viewer
              </h2>
              <div className="overflow-auto p-2 mx-auto content-center">
                { game && <PGNViewer layout={"top"}>{game}</PGNViewer>}

              </div>
            </div>
          </div>
        </div>
    </div>
  );
};