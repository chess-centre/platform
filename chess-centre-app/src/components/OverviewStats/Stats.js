import React from "react";

// MOVE TO DATABASE:
const pageData = {
  id: 1,
  games: {
    total: 0,
  },
  rating: {
    current: 0,
    previous: 2417,
  },
};

function Stats(props) {

  const { entries } = props;
  const { games, rating } = pageData;

  return (
    <div>
      <dl className="mt-5 grid grid-cols-3 gap-1 sm:gap-4">
        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div className="">
            <div className="absolute p-2">
              <span className="text-teal-500 text-3xl">
                <i className="fad fa-calendar-edit"></i>
              </span>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Events
            </p>
          </div>
          <div className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {entries}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6  border-t border-gray-50 dark:border-gray-700">
            </div>
          </div>
        </div>

        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div className="absolute p-3">
              <span className="text-teal-500 text-3xl">
                <i className="fal fa-chess"></i>
              </span>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Games
            </p>
          </div>
          <div className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {games.total}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6 border-t border-gray-50 dark:border-gray-700">
            </div>
          </div>
        </div>

        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <div className="absolute p-3">
              <span className="text-teal-500 text-3xl">
              <i className="far fa-chart-line"></i>
              </span>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Rating
            </p>
          </div>
          <div className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {rating.current}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6 border-t border-gray-50 dark:border-gray-700">
            </div>
          </div>
        </div>
      </dl>
    </div>
  );
}

export default Stats;
