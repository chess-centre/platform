import React from "react";
import Map from "./GoogleMap";
import { openingHours } from "../../api/data.openingHours";

const FindUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          Find Us
        </h2>
        <p>8 Crescent Court</p>
        <p>Ilkley</p>
        <p>LS29 8DE</p>
        <div className="mt-12 rounded-lg">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnoxH8i-1VmO6KVg3VomCsv3l8tOfObOI"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`, borderRadius: `25px` }} />}
            mapElement={<div style={{ height: `100%`, borderRadius: `25px` }} />}
          />
        </div>
        <OpeningTimes />
      </div>
    </div>
  );
};

const OpeningTimes = () => {
  return (
    <>
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2 mt-8">
          Opening Hours*
        </h2>
        <>
          { openingHours
              .map(props => <OpeningTime {...props} />)}
        </>
        <p className="italic text-sm text-gray-600">
            * These hours coincide with our events calendar, check an event is listed or drop us an email to ensure we're open.
        </p>
    </>
  )
}

const OpeningTime = props => {
  const { day, slots } = props;
  return (
    <div className="my-3"><span className="text-xl font-bold">{day}</span>
      {
        slots.map(({ time, type }) => (
          <div className="mb-2 py-1">
            <p className="sm:text-sm text-teal-500">{type}</p>
            <p className="sm:text-xs text-gray-700">{time}</p>
          </div>
        ))
      }
    </div>
  )
}

export default FindUs;
