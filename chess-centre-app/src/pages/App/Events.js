import React from "react";
import UpComingEvents from "../../components/Events/AppEvents";

function Events() {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Events
      </h1>
      <div class="pb-5 border-b border-gray-200">
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            May
          </h3>
          <p class="ml-2 mt-1 text-sm text-gray-500 truncate">entries for our upcoming events</p>
        </div>
      </div>
      <main className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <UpComingEvents />
      </main>
    </>
  );
}

export default Events;
