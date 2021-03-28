import React from "react";

const Issue = ({issue}) => {
  return (
    <a
      className="text-pink-600 hover:underline"
      href={`https://github.com/chess-centre/platform/issues/${issue}`}
    >
      {`#${issue}`}
    </a>
  );
};

export const TechRoadmap = () => {
  return (
    <div className="relative sm:w-1/2 m-8 text-sm sm:text-base">
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
              First Release <span className="font-thin">v1.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <p>May 2021 - our platform launches 🎉</p>
            <ul className="list-disc ml-5">
              <li>
                code available here:{" "}
                <a
                  className="text-pink-600 hover:underline"
                  href="https://github.com/chess-centre"
                >
                  github repos
                </a>
              </li>
              <li>
                <span className="text-purple-800">new volunteers</span> - amazing 🤓 giving up their free time to support
                ♟️ { /* https://github.com/chess-centre/platform#contributors- */}
              </li>
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
              <span className="font-thin">v1.1.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>live games <Issue issue="6" /></li>
              <li>improved dashboard metrics <Issue issue="35" /></li>
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
              <span className="font-thin">v1.2.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>league tables <Issue issue="3" /></li>
              <li>grand prix <Issue issue="64" /></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-black p-1 rounded leading-none">
                Soon
              </span>
              <span className="font-thin">v1.3.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>downloadable games <Issue issue="64" /></li>
              <li>event registration <Issue issue="32" /></li>
              <li>app feature voting <Issue issue="31" /></li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};