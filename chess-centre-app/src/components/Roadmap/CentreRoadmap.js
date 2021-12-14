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
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              Grand openning 🎉
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Junior club begins <br /><span className="text-teal-600 text-sm">May</span></li>
              <li>Team challenges initiated <br /><span className="text-teal-600 text-sm">May</span></li>
              <li>Social club opens <br /><span className="text-teal-600 text-sm">May</span></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>First all-play-all congress <br /><span className="text-teal-600 text-sm">June</span></li>
              <li>First rapidplay <br /><span className="text-teal-600 text-sm">June</span></li>
              <li>First welcome Friendly match <br /><span className="text-teal-600 text-sm">June</span></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
            <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Alcohol license approval 🍺 <br /><span className="text-teal-600 text-sm">July</span></li>
              <li>First live game broadcast 📺 <br /><span className="text-teal-600 text-sm">July</span></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
            <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>First Blitz Event <br /><span className="text-teal-600 text-sm">September</span></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-teal-500 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
            <span className="mr-2 bg-yellow-200 text-black p-1 rounded  leading-none">
                Soon
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>First IM Norm Event <br /><span className="text-teal-600 text-sm">February</span></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-700 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-blue-200 text-black p-1 rounded  leading-none">
                Discuss
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Chess Festival 🚀</li>
              <li>Second Venue 🌱</li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};
