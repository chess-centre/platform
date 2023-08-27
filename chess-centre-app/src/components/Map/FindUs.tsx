import React from "react";
import { openingHours } from "../../api/data.openingHours";

const FindUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:px-8 text-center">
        <div>
          <OpeningTimes />
        </div>
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            Find Us
          </h2>
          <p>329A Coleford Road</p>
          <p>Sheffield</p>
          <p>S9 5NF</p>
          <p className="text-gray-400 text-sm mt-4">What3Words</p>
          <p className="text-black font-sans font-medium text-sm">
            <span className="text-red-600 font-medium">&#47;&#47;&#47;</span>
            <a href="https://w3w.co/loads.statue.hint" target="_blank" rel="noreferrer">loads.statue.hint</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const OpeningTimes = () => {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2 mt-8">
        Opening Hours
      </h2>
      <>
        {openingHours.map((props, key) => (
          <OpeningTime key={key} {...props} />
        ))}
      </>
    </>
  );
};

const OpeningTime = (props) => {
  const { day, slots } = props;
  return (
    <div className="my-3">
      <span className="text-xl font-bold">{day}</span>
      {slots.map(({ time, type, description }, key) => (
        <div key={key} className="mb-2 py-1">
          <p className="sm:text-sm text-yellow-400">{type}</p>
          <p className="sm:text-md text-gray-700">{time}</p>
          <p className="sm:text-xs text-gray-400">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default FindUs;
