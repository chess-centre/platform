import React from "react";
import AllPlayAll from "../../components/Events/Tables/AllPlayAll";

function Results() {
  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Results
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Past Events
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here is where we'll publish results and progress on events.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <AllPlayAll />
      </div>
    </div>
  );
}

export default Results;
