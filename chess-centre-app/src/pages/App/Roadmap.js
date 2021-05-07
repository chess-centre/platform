import React from "react";
import { CentreRoadmap } from "../../components/Roadmap/CentreRoadmap";
import { TechRoadmap } from "../../components/Roadmap/TechRoadmap";

export default function AppRoadmap() {
  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <span className="text-teal-600"><i class="fad fa-road"></i></span> Roadmap
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Continuous Improvement
          </h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            By no means a complete list, here are some of the key things we are focused on
          </p>
        </div>
      </div>
      <div className="bg-white sm:mt-6 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 py-6 sm:py-10">
            <div>
              <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
                The Centre
              </h2>
              <p className="text-center sm:text-left text-base max-w-xl mt-5 mx-auto sm:text-md text-gray-500 md:pr-4">
                Things we are working on in the centre to make your experience
                as fantasic as possible.
              </p>
              <CentreRoadmap />
            </div>
            <div>
              <h2 className="text-center sm:text-left text-base font-semibold text-teal-600 tracking-wide">
                The Platform
              </h2>
              <p className="text-center sm:text-left text-base max-w-xl mt-5 mx-auto sm:text-md text-gray-500 md:pr-4">
                Our technical road map, how we're improving the online
                experience for all our members.
              </p>
              <TechRoadmap />
            </div>
          </div>
        </div>
    </div>
  );
};