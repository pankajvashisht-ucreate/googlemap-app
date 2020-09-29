import React, { useCallback, useState, useEffect } from 'react';
import NavBar from '../../Component/NavBar';
import NormalCard from '../../Component/NormalCard';
import ShopCard from '../../Component/Cards';
import ShowMap from '../../Component/Map';
import FullCard from '../../Component/FullCard';
import {
	getAllProducts,
	getAllCategory,
	latestSearch,
	recomanded,
} from '../../Apis';
const Home = () => {
	const [location, setLocation] = useState('');
	const [latLng, setLatLng] = useState({ lat: 31.4252, lng: 76.3354 });
	const [allProducts, setAllProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [lastestSearch, setLastestSearch] = useState([]);
	const [recomand, setRecomand] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchDone, setSearchDone] = useState(false);
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLatLng({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);
	useEffect(() => {
		latestSearch().then(({ data: { data = {} } }) => {
			setLastestSearch([...data]);
		});
	}, [searchDone]);
	useEffect(() => {
		getAllProducts({ category_id: 0, search: '' })
			.then(({ data: { data = {} } }) => {
				setAllProducts(data);
			})
			.finally(() => {
				setLoading(false);
			});
		getAllCategory().then(({ data: { data = {} } }) => {
			setCategories([...data]);
		});
		recomanded().then(({ data: { data = {} } }) => {
			setRecomand([...data]);
		});
		latestSearch().then(({ data: { data = {} } }) => {
			setLastestSearch([...data]);
		});
	}, []);

	const searchProduct = () => {
		if (search) {
			setLoading(true);
			setAllProducts([]);
			getAllProducts({ category_id: 0, search })
				.then(({ data: { data = {} } }) => {
					setAllProducts(data);
				})
				.finally(() => {
					setLoading(false);
					setSearchDone(!setSearch);
				});
		}
	};

	const handleInput = useCallback(
		({ target: { value } }) => {
			setLocation(value);
		},
		[setLocation]
	);
	const getAddress = useCallback(
		(value) => {
			setLatLng({ lat: value.latitude, lng: value.longitude });
		},
		[setLatLng]
	);
	const getCategoryProduct = (category_id) => {
		setLoading(true);
		getAllProducts({ category_id })
			.then(({ data: { data = {} } }) => {
				setAllProducts(data);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className='container-fluid'>
			<NavBar onChange={handleInput} address={getAddress} value={location} />
			<div className='text-center home-div'>
				<input
					type='text'
					value={search}
					onChange={({ target: { value } }) => setSearch(value)}
					className='form-control home-input'
					placeholder='Search'
				/>
				<button
					className='btn btn-info btn-sm btn-home'
					onClick={searchProduct}
				>
					Search
				</button>
			</div>
			<div className='row'>
				<div className='col-2 cat'>
					<h5> Categories </h5>
					{categories.map((value) => (
						<div
							className='catge'
							onClick={() => getCategoryProduct(value.id)}
							key={value.id}
						>
							{value.name}
						</div>
					))}
				</div>
				<div className='col-10'>
					<div className='row'>
						{loading && allProducts.length === 0 && (
							<div className='loading'>Loading... Please Wait </div>
						)}
						{!loading && allProducts.length > 0 ? (
							allProducts.map((val) => (
								<FullCard key={val.id} name={val.name} subName={val.sub_name} />
							))
						) : (
							<div>No Product found</div>
						)}
					</div>
				</div>
			</div>
			<div className='category'></div>
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
					{recomand.length > 0 ? (
						recomand.map((value) => (
							<NormalCard
								key={value.id}
								name={value.name}
								subTitle={value.subName}
								description='alot of the information is ther'
							/>
						))
					) : (
						<>No recomanded</>
					)}
				</div>
			</div>
			<div className='last search'>
				<h3>Lastest Search</h3>
				<div className='div-search'>
					{lastestSearch.length > 0 ? (
						lastestSearch.map((value) => (
							<NormalCard
								key={value.id}
								name={value.name}
								subTitle={value.subName}
								description='alot of the information is ther'
							/>
						))
					) : (
						<>No Search found</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
