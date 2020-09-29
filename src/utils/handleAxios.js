import { create } from 'axios';
const axios = create({
	baseURL: `http://localhost:4001/apis/`,
});
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error &&
			error.response &&
			error.response.status &&
			error.response.status === 401
		) {
			window.localStorage.clear();
			window.location.replace(`${window.location.origin}/admin/login`);
		}
		throw error;
	}
);

axios.interceptors.request.use(
	(config) => {
		const request = config;
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export default axios;
