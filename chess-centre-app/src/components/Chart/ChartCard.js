import React from "react";

function Chart({ children, title }) {
  return (
    <div className="relative min-w-0 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </p>
      <div className="mb-2">
      {children}
      </div>
      <div className="absolute rounded-b-lg bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 sm:px-6 border-t border-gray-100"></div>
    </div>
  );
}

export default Chart;
