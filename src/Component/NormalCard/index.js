import React from 'react';

const NormalCard = ({name, subTitle, description}) => (
  <div className='normal-card'>
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>
          <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
  );

export default NormalCard;