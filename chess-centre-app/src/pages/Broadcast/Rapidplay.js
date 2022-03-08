import React from "react";
import Review from "../../assets/img/google-review.png";
import RoundRobin from "../../components/Events/Tables/March/RoundRobin";
import Logo from "../../assets/img/logo-light-theme.png";
import {
  name,
  players,
  results,
  settings
} from "../../components/Events/Tables/March/meta.json";


const Viewer = () => {
  return (
    <div className="presentation-background h-full grid grid-rows-1 grid-flow-col gap-4 px-20 pt-8 pb-10">
      <div className="text-center">
        <div className="bg-white py-4 relative border-2 border-gray-300 shadow-lg">
          <h2 className="tracking-tight text-gray-300 text-lg leading-none">
            Welcome to
          </h2>
          <div>
            <img alt="The Chess Centre" className="h-16 mx-auto" src={Logo} />
          </div>
          <div className="absolute right-10 top-4">
            <img className="w-28 mt-4" src={Review} alt="Google Review" />
          </div>
          <h2 className="tracking-tight leading-10 text-teal-600 text-3xl sm:leading-none">
            {name}
          </h2>
          <div className="tracking-tight text-gray-500 text-md leading-none mt-3">
            the 1st dedicated, not for profit, chess center in the UK!
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4 gap-8">
          {players.map(({ entries, section, title }) => {
            const resulst = results.find((r) => r.section === section).scores;
            return (
              <RoundRobin title={title} entries={entries} results={resulst} settings={settings} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Viewer;
