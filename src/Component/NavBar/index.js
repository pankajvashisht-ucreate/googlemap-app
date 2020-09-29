import React from 'react';
import GoogleAutoComplete from '../AutoComplete'; 
const NavBar = ({onChange, address, value}) => {
  return (
  <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
     
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
           <img src={require('../../logo.jpeg')} alt='logo' className='logo' />
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <GoogleAutoComplete className="form-control google" value={value}  onChange={onChange} update={address}/>
        </form>
      </div>
    </nav>
</>
);
};

export default NavBar;