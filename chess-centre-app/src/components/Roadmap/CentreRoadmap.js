import React from "react";

export const CentreRoadmap = () => {
  return (
    <div className="relative m-8 text-sm sm:text-base">
      <div
        className="border-r-2 border-orange-brand absolute h-full top-0"
        style={{ left: "7.5px" }}
      ></div>
      <div
        className="border-r-2 border-teal-500 absolute h-full top-2"
        style={{ left: "7.5px" }}
      ></div>
      <ul className="list-none m-0 p-0">
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-10"></div>
            <div className="flex-1 ml-4 font-medium">
              Grand Openning
            </div>
          </div>
          <div className="ml-12">
            <p>May - launch parties and more 🎉</p>
            <ul className="list-disc ml-5">
              <li>Junior Club begins</li>
              <li>Team Challenges started</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-black p-1 rounded  leading-none">
                Soon
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>First Congress</li>
              <li>First Rapidplay</li>
              <li>First Official League Matches</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-black p-1 rounded  leading-none">
                Soon
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Alcohol License approved 🍺</li>
              <li>First Live Game Broadcast 📺</li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};
