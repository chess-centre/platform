import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import PGNViewer from "../../components/ChessBoard/ChessBoard";
import { games } from "../../api/mock.games";

function Members() {
  const [showSneakPeek, setShowSneakPeak] = useState(false);

  return (
    <div className="relative mt-10 sm:mt-20 py-3 sm:max-w-xl mx-auto">
      <div
        className={
          showSneakPeek
            ? "hidden"
            : "absolute inset-0 bg-teal-700 shadow-lg transform skew-y-0 sm:-rotate-6 rounded-lg"
        }
      ></div>

      {showSneakPeek ? (
        <div className="mb-4 -mt-4">
          <h3 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Our game viewer
          </h3>
          {/* WEB SPECIFIC */}
          <div className="hidden sm:block bg-white dark:bg-gray-800 shadow overflow-auto sm:rounded-lg m-1 p-4 mt-5">
            <PGNViewer layout={"left"}>{games[0].pgn}</PGNViewer>
            <div
              className="text-teal-600 text-xs text-center"
              onClick={() => setShowSneakPeak(false)}
            >
              hide
            </div>
          </div>
          {/* MOBILE SPECIFIC */}
          <div className="block sm:hidden bg-white shadow overflow-auto p-2">
            <PGNViewer layout={"top"}>{games[0].pgn}</PGNViewer>
            <div
              className="text-teal-600 text-xs text-center cursor-pointer"
              onClick={() => setShowSneakPeak(false)}
            >
              hide
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative px-4 ml-2 mr-2 py-10 bg-white shadow-lg rounded-lg sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <img alt="Logo" src={Logo} className="h-7 sm:h-8 m-auto mb-2" />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="sm:py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    COMING SOON!
                  </h1>
                  <h4 className="text-center text-gray-700">Members</h4>
                  <p className="text-teal-800">
                    <span role="img">🐻</span> with us, we're busy building your
                    member experience...
                  </p>
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-teal-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <p className="ml-2">
                        See all other members part of our Community.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-teal-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <p className="ml-2">
                        See results of your friends &#38; team mates.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-teal-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <p className="ml-2">
                        Play through games played by our members!
                      </p>
                    </li>
                  </ul>
                  <div className="hidden text-center">
                    <span
                      className="text-teal-600 text-xs cursor-pointer"
                      onClick={() => setShowSneakPeak(true)}
                    >
                      sneak peek?
                    </span>
                  </div>
                </div>
                <div className="pt-4 text-base leading-6 sm:text-lg sm:leading-7 mt-3">
                  <p className="font-bold">Write code? 🐵</p>
                  <p>
                    Checkout the source code for this site and get involved.
                    <a
                      href="https://github.com/chess-centre"
                      className="text-teal-600 hover:text-teal-700"
                    >
                      {" "}
                      Let's do this &rarr;{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Members;
