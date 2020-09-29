import React from 'react';
import ShopMap from '../Map';

const ShopCard = ({name, lat, lng, location = 'UNA', isOpen=true, isMap = false}) => (
  <>
    <div className="card search">
    {isMap && (<ShopMap lat={lat} lng={lng} className='card-maps card-img-top' />)}
    <div className="card-body">
      <p className="card-text">{name} {location}{isOpen ?  'Yes':'NO' }</p>
    </div>
    </div>
  </>
);


export default ShopCard;