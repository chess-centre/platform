import React from "react";

export const CentreRoadmap = () => {
  return (
    <div className="relative m-8 text-sm sm:text-base">
      <div
        className="border-r-2 border-orange-brand absolute h-full top-0"
        style={{ left: "7.5px" }}
      ></div>
      <div
        className="border-r-2 border-teal-500 absolute top-32"
        style={{ left: "7.5px", height: "330px" }}
      ></div>
      <ul className="list-none m-0 p-0">
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-10"></div>
            <div className="flex-1 ml-4 font-medium">
              Grand openning
            </div>
          </div>
          <div className="ml-12">
            <p>May - pre launch events 🎉</p>
            <ul className="list-disc ml-5">
              <li>Junior club begins</li>
              <li>Team challenges initiated</li>
              <li>Social club opens</li>
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
              <li>First all-play-all congress - <span className="text-teal-600 text-sm">June</span></li>
              <li>First rapidplay - <span className="text-teal-600 text-sm">June</span></li>
              <li>First official league matches</li>
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
              <li>Alcohol license approval 🍺</li>
              <li>First live game broadcast 📺</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-blue-200 text-black p-1 rounded  leading-none">
                Discuss
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Purchasable Chess supplies</li>
              <li>FIDE rated events</li>
              <li>New event types</li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};
