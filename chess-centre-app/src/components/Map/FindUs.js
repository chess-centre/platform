import React from "react";
import Map from "./GoogleMap";

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
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2 mt-6">
          Opening Hours*
        </h2>
        <p className="my-3">Tuesday <span className="text-gray-700 font-medium">6pm-8pm</span> <br /><span className="text-sm text-teal-500">Juniors</span></p>
        <p className="my-3">Thursday <span className="text-gray-700 font-medium">7pm-10pm</span> <br /><span className="text-sm text-teal-500">Social</span></p>
        <p className="my-3">Saturday <span className="text-gray-700 font-medium">9:30am-3pm</span> <br /><span className="text-sm text-teal-500">Congress / Rapidplay</span></p>
        <p className="my-3">Sunday <span className="text-gray-700 font-medium">9:30am-3pm</span> <br /><span className="text-sm text-teal-500">Congress</span></p>
        <br />
        <p className="italic text-sm text-gray-600">* These hours coincide with our events calendar, check an event is listed or drop us an email to ensure we're open.</p>
      </div>
    </div>
  );
};

export default FindUs;
