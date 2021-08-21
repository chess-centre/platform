import React from "react";
import Logo from "../../assets/img/logo.svg";

import Rapidplay from "../../components/Events/Tables/August/Rapidplay";
import { Link } from "react-router-dom";

const Viewer = () => {
  return (
    <div className="grid grid-rows-1 grid-flow-col gap-4 px-20 pt-5 pb-10 h-screen">
      <div className="text-center">
        <div className="relative">
            
            
        </div>
        
        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
        <span className="bg-gradient-to-r text-gradient from-orange-400 to-orange-700 mr-3"><i className="fak fa-chess-centre"></i></span>
          <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">
             The Chess Centre
          </span>
        </h2>
        <h3 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
          <span className="text-gray-900">August Rapidplay 2021</span>
        </h3>
        <div className="text-left absolute">
          {/* <Link
            className="text-teal-600 hover:text-teal-500 text-xs"
            to="/internal/live"
          >
            <i className="far fa-long-arrow-alt-left"></i> back
          </Link> */}
        </div>
        <div className="">
          <Rapidplay />
        </div>
      </div>
    </div>
  );
};

export default Viewer;
