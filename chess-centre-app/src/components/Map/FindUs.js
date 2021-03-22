import React from "react";
import Map from "./GoogleMap";

const FindUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          Find Us
        </h2>
        <p>8 Crescent Court</p>
        <p>Ilkley</p>
        <p>LS29 8DE</p>
        <div className="mt-12">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnoxH8i-1VmO6KVg3VomCsv3l8tOfObOI"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  );
};

export default FindUs;
