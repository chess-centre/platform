import React from "react";
import Bottom from "./BottomSection";
import QR from "../../assets/img/QR-live-games.png";

const Internal = (props) => {
  const { url } = props;
  return (

    <div className="grid grid-rows-4 grid-flow-col gap-4 px-10 py-10 h-screen">
      <div className="row-span-4 col-span-4 bg-gray-100 rounded-lg shadow-xs overflow-hidden">
        <div>
          <div className="aspect-w-16 aspect-h-11">
            <iframe
              title="Live Games"
              frameBorder="0"
              allowFullScreen
              src={url ? url : "http://192.168.1.248:1982/liveviewer/index.html"}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-3 bg-gray-100 rounded-lg shadow-xs p-4">
        <div className="text-center">
          <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">The Chess Centre</span>
          </h2>
          <h1 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">July Congress</h1>
          <Bottom />
        </div>
      </div>
      {/* <div className="flex row-span-1 col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-2">
        <img
          className="object-center w-40 mx-auto self-center"
          src={QR}
          alt="QR Code"
        />
      </div> */}
    </div>
  );
};

export default Internal;
