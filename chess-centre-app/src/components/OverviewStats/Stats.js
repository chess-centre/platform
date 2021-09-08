import React from "react";
import { Link } from "react-router-dom";

function Stats(props) {
  const { entries, rating, gameCount } = props;

  return (
    <div>
      <dl className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
        <div className="relative text-center sm:text-left bg-white dark:bg-gray-800 px-4 sm:pb-12 sm:pt-6 sm:px-6 shadow rounded-lg sm:overflow-hidden">
          <div>
            <div className="sm:absolute p-2">
              <span className="text-teal-500 text-3xl">
                <i className="fad fa-calendar-edit"></i>
              </span>
            </div>
            <p className="sm:ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Events
            </p>
          </div>
          <div className="sm:ml-16 flex items-baseline pb-7 sm:pb-0">
            {entries.length > 0 ? (
              <p
                className="text-2xl font-semibold text-gray-900 dark:text-white m-auto sm:m-0"
              >
                {entries.length}
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900 dark:text-white m-auto sm:m-0">
                {0}
              </p>
            )}

            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 sm:px-6  border-t border-gray-100 dark:border-gray-700"></div>
          </div>
        </div>

        <div className="relative text-center sm:text-left bg-white dark:bg-gray-800 px-4 sm:pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div className="sm:absolute p-2">
              <span className="text-teal-500 text-3xl">
                <i className="fad fa-chess"></i>
              </span>
            </div>
            <p className="sm:ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Games
            </p>
          </div>
          <div className="sm:ml-16 flex items-baseline pb-7 sm:pb-0">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white m-auto sm:m-0">
              {gameCount ? <Link className="text-teal-500" to="/app/games">{ gameCount } </Link> : 0 }
            </p>

            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 sm:px-6 border-t border-gray-100 dark:border-gray-700"></div>
          </div>
        </div>

        <div className="relative text-center sm:text-left bg-white dark:bg-gray-800 px-4 sm:pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div className="sm:absolute p-2">
              <span className="text-teal-500 text-3xl">
                <i className="fad fa-chart-line"></i>
              </span>
            </div>
            <p className="sm:ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Rating
            </p>
          </div>
          <div className="sm:ml-16 flex items-baseline pb-7 sm:pb-0">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white m-auto sm:m-0">
              {rating}
            </p>

            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 sm:px-10 border-t border-gray-100 dark:border-gray-700"></div>
          </div>
        </div>
      </dl>
    </div>
  );
}

export default Stats;
