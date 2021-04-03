import React from "react";
import AppEvents from "../../components/Events/AppEvents";

function Events() {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Events
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            May
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">entries for our upcoming events</p>
        </div>
      </div>
      <main className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AppEvents />
      </main>
    </>
  );
}

export default Events;
