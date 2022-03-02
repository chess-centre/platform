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
              <li><span className="text-teal-600 text-sm">May 2021</span></li>
              <li>&#x2022; Junior club begins</li>
              <li>&#x2022; Team challenges initiated</li>
              <li>&#x2022; Social club opens</li>
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
              <li><span className="text-teal-600 text-sm">June 2021</span></li>
              <li>&#x2022; First all-play-all congress</li>
              <li>&#x2022; First rapidplay</li>
              <li>&#x2022; First welcome Friendly match</li>
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
              <li><span className="text-teal-600 text-sm">July 2021</span></li>
              <li>&#x2022; Alcohol license approval 🍺</li>
              <li>&#x2022; First live game broadcast 📺</li>
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
              <li><span className="text-teal-600 text-sm">August 2021</span></li>
              <li>&#x2022; Donated Chess Sets to Schools ♟️</li>
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
              <li><span className="text-teal-600 text-sm">September 2021</span></li>
              <li>&#x2022; First Blitz Event</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-teal-500 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li><span className="text-teal-600 text-sm">February 2022</span></li>
              <li>&#x2022; First IM Norm Event</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-pink-700 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-pink-200 text-pink-700 p-1 rounded  leading-none">
                Launched
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li><span className="text-teal-600 text-sm">March 2022</span></li>
              <li>&#x2022; Launch Club Championship</li>
              <li>&#x2022; Ilkley Chess Festival 🚀</li>
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
              <li>&#x2022; Launch new Wharfdale league</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-blue-800 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-blue-200 text-black p-1 rounded  leading-none">
                Discuss
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>&#x2022; Second Venue 🌱</li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};
