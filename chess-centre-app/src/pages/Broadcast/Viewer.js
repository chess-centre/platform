import React from "react";
import LiveResults from "./LiveResults";

const Viewer = () => {
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-4 px-10 py-10 h-screen">
      <div className="col-span-1 row-span-3 bg-gray-100 rounded-lg shadow-xs p-4">
        <div className="text-center">
          <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">The Chess Centre</span>
          </h2>
          
          <LiveResults />
        </div>
      </div>
    </div>
  );
};

export default Viewer;