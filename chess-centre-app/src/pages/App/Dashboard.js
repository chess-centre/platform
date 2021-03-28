import React from "react";
import Stats from "../../components/OverviewStats/Stats";


function Dashboard() {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Overview
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 truncate">insights and </p>
        </div>
      </div>
      <Stats />
    </>
  );
}

export default Dashboard;
