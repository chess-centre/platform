<<<<<<< HEAD
import React from "react";
import ChesscomFetch from "./Chesscom";
import LiChessFetch from "./LiChess";

export default function IntegrationProfile({ ...member }) {
=======
import { API } from "aws-amplify";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import liChessImage from "../../../../assets/img/lichess.png";
import chesscomImage from "../../../../assets/img/chesscom.png";
import { AtSymbolIcon, CursorClickIcon } from "@heroicons/react/solid";


export default function IntegrationProfile({ ...member }) {


  const { addToast } = useToasts();

  const [liChessUsername, setLiChessUsername] = useState(
    member.liChessUsername || ""
  );
  const [liChessBlitz, setLiChessBlitz] = useState({
    rating: undefined
  });
  const [liChessBullet, setLiChessBullet] = useState({
    rating: undefined
  });

  const [chesscomUsername, setChessdomUsername] = useState(
    member.chesscomUsername || ""
  );
  const [chesscomBlitz, setChesscomBlitz] = useState({
    last: { rating: undefined },
  });
  const [chesscomBullet, setChesscomBullet] = useState({
    last: { rating: undefined },
  });

  const getLiChessData = async () => {
    if (!liChessUsername) return;
    try {
      const response = await API.post("lichess", `/user/${liChessUsername}`);
      if (!response.error) {
        const {
          perfs: { blitz, bullet },
        } = response;
        setLiChessBlitz(blitz);
        setLiChessBullet(bullet);
        addToast(`Successfully updated your LiChess username!`, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChesscomData = async () => {
    if(!chesscomUsername) return;
    try {
      const response = await API.post("chesscom", `/user/${chesscomUsername}`);
      if (response) {
        const { chess_bullet, chess_blitz } = response;
        setChesscomBlitz(chess_blitz);
        setChesscomBullet(chess_bullet);
        addToast(`Successfully updated your Chess.com username!`, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        console.log("nothing found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
  return (
    <div>
      <div className="shadow rounded-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Integrations
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Sync your account with other popular Chess sites.
            </p>
          </div>
<<<<<<< HEAD
          <div className="grid grid-cols-6 gap-6">
            <LiChessFetch {...member} />
            <ChesscomFetch {...member} />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:text-right text-xs sm:px-6 border-t border-gray-50 dark:border-gray-700 italic text-center">

        </div>
=======

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3 gap-6">
              <div className="">
                <img
                  src={liChessImage}
                  alt="LiChess"
                  className="sm:w-72 w-32 m-auto"
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSymbolIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        onChange={(e) => setLiChessUsername(e.target.value)}
                        type="text"
                        name="liChessUsername"
                        id="liChessUsername"
                        defaultValue={liChessUsername}
                        className="focus:ring-teal-500 focus:border-teal-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                        placeholder="DrNy"
                      />
                    </div>
                    <button
                      onClick={getLiChessData}
                      type="button"
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <CursorClickIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Bullet</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={liChessBullet.rating}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Blitz</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={liChessBlitz.rating}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <div className="col-span-12 gap-6">
                <img
                  src={chesscomImage}
                  alt="Chess.com"
                  className="sm:w-72 sm:h-18 mb-3 w-32 m-auto"
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSymbolIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        onChange={(e) => setChessdomUsername(e.target.value)}
                        type="text"
                        name="chesscomUsername"
                        id="chesscomUsername"
                        className="focus:ring-teal-500 focus:border-teal-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                        placeholder="DrNy"
                      />
                    </div>
                    <button
                      onClick={getChesscomData}
                      type="button"
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <CursorClickIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Bullet</div>
                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={chesscomBullet?.last?.rating}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-span-3 gap-6 mt-6">
                  <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex">Blitz</div>

                    <input
                      className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3  text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-60`}
                      disabled
                      value={chesscomBlitz?.last?.rating}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:text-right text-xs sm:px-6 border-t border-gray-50 dark:border-gray-700 italic text-center"></div>
>>>>>>> bdd1292fc106d12e25c5df34871680264e89c484
      </div>
    </div>
  );
}
