import React from "react";
import {
  GoogleMap as GMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import Logo from "../../assets/img/logo-map-pin-orange.svg";

const GoogleMap = withScriptjs(
  withGoogleMap((props) => (
    <GMap
      defaultZoom={16}
      defaultCenter={{
        lat: 53.925857457885456,
        lng: -1.8227872999999994,
      }}
    >
      <Marker
        position={{
          lat: 53.925857457885456,
          lng: -1.8227872999999994
        }}
        icon={{ url: Logo, width: 16, height: 16 }} />
    
    </GMap>
  ))
);

export default GoogleMap;
