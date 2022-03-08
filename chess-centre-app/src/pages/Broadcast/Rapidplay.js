import React from "react";
import RoundRobin from "../../components/Events/Tables/March/RoundRobin";
import Logo from "../../assets/img/logo-dark-theme.png";
import {
  name,
  players,
  results,
  settings,
} from "../../components/Events/Tables/March/meta.json";

const Viewer = () => {
  return (
    <div className="bg-cool-gray-700 h-full grid grid-rows-1 grid-flow-col px-5 pt-4 pb-10">
      <div className="text-center">
        <div className=" bg-cool-gray-900 py-4 relative border-2 border-teal-600 shadow-lg rounded-lg">
          <div>
            <img alt="The Chess Centre" className="h-14 mx-auto" src={Logo} />
          </div>
          <h2 className="tracking-tight leading-10 text-teal-500 text-3xl sm:leading-none">
            {name}
          </h2>
          <div className="tracking-tight text-gray-100 text-md leading-none mt-3">
            Welcome to the 1st dedicated, not for profit, chess center in the UK
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {players.map(({ entries, section, title, icon }, index) => {
            const resulst = results.find((r) => r.section === section).scores;
            return (
              <RoundRobin
                title={title}
                entries={entries}
                results={resulst}
                settings={settings}
                icon={icon}
                boards={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Viewer;