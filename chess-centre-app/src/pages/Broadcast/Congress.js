import React from "react";
import Congress from "../../components/Events/Tables/August/Congress";

const Viewer = () => {
  return (
    <div className="grid grid-rows-1 grid-flow-col gap-4 px-20 pt-8 pb-10 h-screen">
      <div className="text-center">
        <div className="bg-gray-100 py-8 rounded-lg">  
        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
        <span className="bg-gradient-to-r text-gradient from-orange-400 to-orange-700 mr-3"><i className="fak fa-chess-centre"></i></span>
          <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">
             The Chess Centre
          </span>
        </h2>
        <h3 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
          <span className="text-gray-900">August Congress 2021</span>
        </h3>
        </div>
        <div className="-mt-2">
          <Congress />
        </div>
      </div>
    </div>
  );
};

export default Viewer;
