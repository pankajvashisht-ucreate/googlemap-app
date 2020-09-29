import axios from '../utils/handleAxios';

export const getAllProducts = ({ category_id = 0, search = '' }) => {
	return axios.get('/products', {
		params: { category_id, search },
	});
};

export const getAllCategory = () => {
	return axios.get('/category');
};

export const recomanded = () => {
	return axios.get('/recommanded');
};
export const latestSearch = () => {
	return axios.get('/latest-search');
};
