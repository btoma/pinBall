import React from "react";

export default function Map({location}){
  const {lat,lon, id, name} = location;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div className="map-content">
      
    </div>
  );
}