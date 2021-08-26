import React from "react";
import ChesscomFetch from "./Chesscom";
import LiChessFetch from "./LiChess";

export default function IntegrationProfile({ ...member }) {
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
          <div className="grid grid-cols-6 gap-6">
            <LiChessFetch {...member} />
            <ChesscomFetch {...member} />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:text-right text-xs sm:px-6 border-t border-gray-50 dark:border-gray-700 italic text-center">

        </div>
      </div>
    </div>
  );
}
