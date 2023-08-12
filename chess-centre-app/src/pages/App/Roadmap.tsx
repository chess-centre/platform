import React from "react";
import { CentreRoadmap } from "../../components/Roadmap/CentreRoadmap";
import { TechRoadmap } from "../../components/Roadmap/TechRoadmap";

export default function AppRoadmap() {

  document.title = "Sheffield Chess Centre | Roadmap";

  const brandColors = [
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
    "bg-orange-50",
    "bg-orange-100",
    "bg-orange-200",
    "bg-orange-300",
    "bg-orange-400",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-orange-800",
    "bg-orange-900",
    "bg-pink-50",
    "bg-pink-100",
    "bg-pink-200",
    "bg-pink-300",
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
    "bg-pink-700",
    "bg-pink-800",
    "bg-pink-900",
    "bg-green-50",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
    "border-blue-50",
    "border-blue-100",
    "border-blue-200",
    "border-blue-300",
    "border-blue-400",
    "border-blue-500",
    "border-blue-600",
    "border-blue-700",
    "border-blue-800",
    "border-blue-900",
    "border-yellow-50",
    "border-yellow-100",
    "border-yellow-200",
    "border-yellow-300",
    "border-yellow-400",
    "border-yellow-400",
    "border-yellow-500",
    "border-yellow-700",
    "border-yellow-800",
    "border-yellow-900",
    "border-orange-50",
    "border-orange-100",
    "border-orange-200",
    "border-orange-300",
    "border-orange-400",
    "border-orange-500",
    "border-orange-600",
    "border-orange-700",
    "border-orange-800",
    "border-orange-900",
    "border-pink-50",
    "border-pink-100",
    "border-pink-200",
    "border-pink-300",
    "border-pink-400",
    "border-pink-500",
    "border-pink-600",
    "border-pink-700",
    "border-pink-800",
    "border-pink-900",
    "border-green-50",
    "border-green-100",
    "border-green-200",
    "border-green-300",
    "border-green-400",
    "border-green-500",
    "border-green-600",
    "border-green-700",
    "border-green-800",
    "border-green-900",
  ];

  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <span className="text-yellow-500"><i className="fad fa-road"></i></span> Roadmap
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
            <h2 className="text-center sm:text-left text-base font-semibold text-yellow-500 tracking-wide">
              The Centre
            </h2>
            <p className="text-center sm:text-left text-base max-w-xl mt-5 mx-auto sm:text-md text-gray-500 md:pr-4">
              Things we are working on in the centre to make your experience
              as fantasic as possible.
            </p>
            <CentreRoadmap />
          </div>
          <div>
            <h2 className="text-center sm:text-left text-base font-semibold text-yellow-500 tracking-wide">
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
      <div>
        {brandColors.map(c => <span className={c}></span>)}
      </div>
    </div>
  );
};