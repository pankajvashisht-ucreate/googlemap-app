import React, { useRef, useEffect } from 'react';
const ShowMap = ({lat = 31.4252, lng = 76.3354, className= 'google-map'}) => {
  const mapDiv = useRef(null);
  useEffect(() => {
    const { google } = window;
    const mapInfo = mapDiv.current;
    console.log(lat, lng);
    if(mapDiv.current){
      const center = new google.maps.LatLng(lat,lng);
      const map = new google.maps.Map(mapInfo, {
        center,
        zoom: 16,
      });
      new google.maps.InfoWindow();
      new google.maps.Marker({
        position: center,
        map: map,
        title: 'Shop name'
      });
      //handleLocationError(true, infoWindow, map.getCenter());
      // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent(
      //     browserHasGeolocation
      //       ? "Error: The Geolocation service failed."
      //       : "Error: Your browser doesn't support geolocation."
      //   );
      //   infoWindow.open(map);
      // }
    }
  }, [lat, lng]);
  return (
  <>
    <div className={`${className}`}>
      <div id="maps" ref={mapDiv} className='map'></div>
    </div>
  </>
);
};

export default ShowMap;