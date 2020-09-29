import React, {useCallback, useState, useEffect} from 'react';
import NavBar from '../../Component/NavBar';
import NormalCard  from '../../Component/NormalCard';
import ShopCard from '../../Component/Cards';
import ShowMap from '../../Component/Map';
import FullCard from '../../Component/FullCard';
const Home = () => {
  const [location, setLocation] = useState('');
  const [latLng, setLatLng] = useState({lat: 31.4252,lng:76.3354});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLatLng({lat: position.coords.latitude, lng: position.coords.longitude});
        }
      );
    } 
  }, []);

  const handleInput = useCallback(({target:{value}}) => {
    setLocation(value)
  }, [setLocation]);
  const getAddress = useCallback(value => {
    setLatLng({lat: value.latitude, lng: value.longitude})
  },[setLatLng]);
  return (
    <div className='container-fluid'>
      <NavBar onChange={handleInput} address={getAddress} value={location} />
      <div className='text-center home-div'>
        <input type='text' className='form-control home-input' placeholder='Search' />
        <button className='btn btn-info btn-sm btn-home'>Search</button>
      </div>
      <div className='row'>
          <div className= 'col-2 cat'>
            <h5> Categories </h5>
           
            <div>One category</div>
            <div>One category</div>
            <div>One category</div>
            <div>One category</div>
            <div>One category</div>
            </div>
          <div className='col-10'>
            <div className='row'>
                <FullCard />
                <FullCard />
                <FullCard />
                <FullCard />
                <FullCard />
                <FullCard />
                <FullCard />
            </div>
                
          </div>
      </div>
      <div className='category'>
        
         
       
      
      </div>
      <div className='map-product'>
        <div className='prodcuts'>
          <div className='shops'>
          <h3>Shops Listing</h3>
            <ShopCard lat='30.7046' lng='76.7179' name='Pankaj shop' />
            <ShopCard lat='30.7333' lng='76.7794' name='Arvid shop' />
            <ShopCard lat='30.7333' lng='76.7794' name='Pankaj shop' />
            <ShopCard lat='30.7333' lng='76.7794' name='Pankaj shop' />
            <ShopCard lat='30.7333' lng='76.7794' name='Pankaj shop' />
          </div>
          
            <ShowMap lat={latLng.lat} lng={latLng.lng} />
        </div>
      </div>
      <div className='recomanded'>
        <h3>Recomanded</h3>
        <div className='div-rec'>
         
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          
         
        </div>
      </div>
      <div className='last search'>
        <h3>Lastest Search</h3>
        <div className='div-search'>
        <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
          <NormalCard name='pankaj' subTitle='Una' description='alot of the information is ther'/>
        </div>
      </div>
    </div>
  );
};

export default Home;