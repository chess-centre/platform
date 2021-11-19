import React from "react";
import QR from "../../assets/img/QR-live-games.png";
import RoundRobin from "../../components/Events/Tables/November/RoundRobin";
import Swiss from "../../components/Events/Tables/November/Swiss";
import { name } from "../../components/Events/Tables/September/meta.json";


const Viewer = () => {
  return (
    <div className="bg-gray-50 h-full grid grid-rows-1 grid-flow-col gap-4 px-20 pt-8 pb-10">
      <div className="text-center">
        <div className="bg-white shadow-lg py-4 rounded-lg relative">
          <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            <span className="bg-gradient-to-r text-gradient from-orange-400 to-orange-700 mr-3">
              <i className="fak fa-chess-centre"></i>
            </span>
            <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">
              The Chess Centre
            </span>
            <div className="absolute right-10 top-4">
              <img className="w-28" src={QR} alt="Live Games" />
            </div>
            
          </h2>
          <h3 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
            <span className="text-gray-900">{ name }</span>
          </h3>
          <h3 className="text-lg tracking-tight leading-10 font-extrabold text-gray-900">
            <span className="text-gray-300">#NotForProfit</span>
          </h3>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <RoundRobin/>
          <Swiss />
        </div>
      </div>
    </div>
  );
};

export default Viewer;
