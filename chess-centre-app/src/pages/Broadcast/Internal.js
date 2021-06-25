import React from "react";
import List from "./List";

const Internal = () => {
  return (

    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">Event Manager</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
           Live Broadcasts
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Select the prepared event to show the live boards internally.
          </p>
        </div>
        <List></List>
      </div>
    </div>
  )
};

export default Internal;
