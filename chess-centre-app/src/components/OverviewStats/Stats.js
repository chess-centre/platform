import React from "react";
import { Link } from "react-router-dom";

// MOVE TO DATABASE:
const pageData = {
  id: 1,
  events: {
    total: 3,
  },
  games: {
    total: 5
  },
  rating: {
    current: 2317,
    previous: 2417
  }
}


function Stats() {

  const { id, events, games, rating } = pageData;

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt className="">
            <div className="absolute bg-teal-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Events
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{events.total}</p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6  border-t border-gray-50 dark:border-gray-700">
              <div className="text-sm">
                <Link to={`/app/members/${id}`}
                  className="font-medium text-orange-brand hover:text-orange-500">
                  View all
                </Link>
              </div>
            </div>
          </dd>
        </div>

        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-teal-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Games
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{games.total}</p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6 border-t border-gray-50 dark:border-gray-700">
              <div className="text-sm">
                <Link to={`/app/members/${id}`}
                  className="font-medium text-orange-brand hover:text-orange-500">
                  View all
                </Link>
              </div>
            </div>
          </dd>
        </div>

        <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-teal-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              My Rating
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{rating.current}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-red-500">
              <svg
                className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              3.2
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6 border-t border-gray-50 dark:border-gray-700">
              <div className="text-sm">
                <Link to={`/app/members/${id}`}
                  className="font-medium text-orange-brand hover:text-orange-500">
                  View all
                </Link>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default Stats;
