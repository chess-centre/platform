import React from "react";
import MayCongress from "../../components/Events/Tables/MayCongress";
// import MayRapidplay from "../../components/Events/Tables/MayRapidplay";
import Nav from "../../components/Events/Breadcrumb/Nav";

function Results() {
  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Results
      </h1>
      <div className="my-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            <Nav />
          </h3> 
        </div>
      </div>
      <div className="mt-6">
        <MayCongress />
        {/* <MayRapidplay /> */}
      </div>
    </div>
  );
}

export default Results;
