import React, { useEffect } from "react";

export default function Juniors() {

  useEffect(() => {
  }, []);

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-joystick text-teal-600"></i> Parents
          <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 top-2">
            Junior Membership 
          </span>
          </div>
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-center sm:text-left text-gray-500 dark:text-gray-400">
            Here is where we will provide some key resources and useful information to help with your childs progress.
          </p>
        </div>
      </div>

    </>
  );
}