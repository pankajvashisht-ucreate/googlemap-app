const express = require('express');
const router = express.Router();
const Apiresponse = require('./Response');
const { getToken } = require('./middleware');
const {
	getAllProducts,
	getAllCategory,
	lastSearch,
	reconadedSearch,
} = require('./Controller');
router.use(getToken);
router.get('/products', Apiresponse(getAllProducts));
router.get('/category', Apiresponse(getAllCategory));
router.get('/latest-search', Apiresponse(lastSearch));
router.get('/recommanded', Apiresponse(reconadedSearch));
module.exports = router;
