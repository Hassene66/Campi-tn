import React, { useState } from "react";
import { Map, TileLayer, Popup, Marker, withLeaflet } from "react-leaflet";
const MyMarker = (props) => {
  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};
const Location = ({
  center = { lat: 33.94944031898135, lng: 9.79101609438658 },
  zoom = 6,
}) => {
  const [state, setState] = useState({
    currentPos: null,
  });

  const handleClick = (e) => {
    setState({ currentPos: e.latlng });
    console.log(state.currentPos);
  };

  return (
    <div>
      <Map
        className="markercluster-map"
        center={center}
        zoom={zoom}
        onClick={(e) => {
          handleClick(e);
          console.log("clicked");
        }}
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {state.currentPos && <Marker position={state.currentPos}></Marker>}
      </Map>
    </div>
  );
};

export default Location;
