import React from "react";
import {
  GoogleMap as GMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import Logo from "../../assets/img/festival-map-pin.svg";

const GoogleMap = withScriptjs(
  withGoogleMap((props) => (
    <GMap
      defaultZoom={17.5}
      defaultCenter={{
        lat: 53.92429665159249,
        lng: -1.821591459945466,
      }}
    >
      <Marker
        position={{
          lat: 53.92429665159249,
          lng: -1.821591459945466,
        }}
        icon={{ url: Logo, width: 20, height: 20 }}
      />
    </GMap>
  ))
);

const FestivalMap = () => {
  return (
    <div className="">
      <GoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnoxH8i-1VmO6KVg3VomCsv3l8tOfObOI"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: `300px` }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default FestivalMap;
