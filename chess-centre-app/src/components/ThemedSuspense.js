import React from "react";

function ThemedSuspense() {
  return (
    <div className="content-center w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <div className="rounded animate-spin ease duration-300 w-12 h-12 border-4 border-white"></div>
      <span className="mx-2">Loading ...</span>
    </div>
  );
}

export default ThemedSuspense;
