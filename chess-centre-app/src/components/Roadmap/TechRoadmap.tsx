import React from "react";

const Issue = ({ issue }) => {
  return (
    <a
      className="text-pink-600 text-xs hover:underline"
      href={`https://github.com/chess-centre/platform/issues/${issue}`}
    >
      {`Ref #${issue}`}
    </a>
  );
};

const Project = ({ repoName }) => {
  return (
    <a
      className="text-sky-600 text-xs hover:underline"
      href={`https://github.com/chess-centre/${repoName}`}
    >
      {`view here`}
    </a>
  );
};


export const TechRoadmap = () => {
  return (
    <div className="relative m-8 text-sm sm:text-base">
      <div
        className="border-r-2 border-yellow-400 absolute h-full top-2"
        style={{ left: "7.5px" }}
      ></div>
      <ul className="list-none m-0 p-0">
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-yellow-500 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-yellow-600 p-1 rounded leading-none">
                Horizon
              </span>
              <span className="font-thin">v3.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Junior - lesson resources</li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-yellow-300 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-black p-1 rounded leading-none">
                Next
              </span>
              <span className="font-thin">v2.3.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                New Project Initiatives
                <ul className="list-disc ml-5">
                  <li>Broadcasts <Project repoName="broadcasts" /></li>
                  <li>Leagues <Project repoName="leagues" /></li>
                </ul>
              </li>
              <li>
                <span className="line-through">Latest News</span> <span className="text-xs text-gray-400">abandoned</span> <br />
                <Issue issue="312" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-pink-700 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-pink-200 text-pink-700 p-1 rounded leading-none">
                Launched
              </span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                Widgets - events <br /> <Issue issue="746" />
              </li>
              <li>
                Free Event Entry - members<br /> <Issue issue="656" />
              </li>
              <li>
                PGN Download<br /> <Issue issue="730" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-green-800 p-1 rounded  leading-none">
                Complete
              </span>
              <span className="font-thin">v2.2.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                Public API - events <br /> <Issue issue="618" />
              </li>
              <li>
                Event Results 📊<br />
                <Issue issue="475" />, {" "}<Issue issue="743" />
              </li>
              <li>
                Event TPR +/- <br />
                <Issue issue="744" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-green-800 p-1 rounded  leading-none">
                Complete
              </span>
              <span className="font-thin">v2.2.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                Festival - multi section event <br /> <Issue issue="457" />,{" "}
                <Issue issue="588" />
              </li>
              <li>
                Junior - multi section event <br /> <Issue issue="571" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-green-800 p-1 rounded leading-none">
                Complete
              </span>
              <span className="font-thin">v2.1.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                Game / Event Result <br />
                <Issue issue="449" />
              </li>
              <li>
                Performance Ratings <br /> <Issue issue="473" />
              </li>
              <li>
                Image Gallery <span className="text-xs text-gray-400">depreciated</span> <br /> <Issue issue="468" />
              </li>
              <li>
                Enhanced FAQs <br /> <Issue issue="453" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-green-800 p-1 rounded leading-none">
                Complete
              </span>
              <span className="font-thin">v2.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                Dashboard insights <br />
                <Issue issue="100" />
              </li>
              <li>
                Player search <br />
                <Issue issue="246" />
              </li>
              <li>
                PGN viewer <br />
                <Issue issue="243" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-green-800 p-1 rounded  leading-none">
                Complete
              </span>
              <span className="font-thin">v1.1.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>
                DGT Live games 📺 <br />
                <Issue issue="99" />
              </li>
              <li>
                Automatic ECF ratings <br />
                <Issue issue="246" />
              </li>
              <li>
                Lichess / Chess.com integration <br />
                <Issue issue="282" />
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              First Release <span className="font-thin">v1.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <p>Platform launch 🥂</p>
            <ul className="list-disc ml-5">
              <li>
                Code available here:
                <br />
                <a
                  className="text-pink-600 hover:underline"
                  href="https://github.com/chess-centre"
                >
                  GitHub Code repository
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
