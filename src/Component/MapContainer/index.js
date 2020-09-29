import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = ({lat = 31.4252, lng = 76.3354, google}) =>  {
    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat,
            lng
          }
        }
      />
    );
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);