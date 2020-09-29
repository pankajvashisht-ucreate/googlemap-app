const useragent = require('express-useragent');
const getToken = (req, rex, next) => {
	const source = req.headers['user-agent'];
	req.token = useragent.parse(source).version;
	next();
};

module.exports = {
	getToken,
};
