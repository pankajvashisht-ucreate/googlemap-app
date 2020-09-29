const db = require('./SqlQuery');
const DB = new db();
const queryProduct = async (conditions) => {
	return await DB.find('third_categories', 'all', conditions);
};
const getAllProducts = async ({
	token,
	query: { category_id = 0, search = '' },
}) => {
	const conditions = {
		conditions: {
			raw: [],
		},
		join: [
			'categories on (categories.id =  third_categories.category_id)',
			'sub_categories on (sub_categories.id =  third_categories.sub_category_id)',
		],
		fields: ['third_categories.*', 'sub_categories.name as sub_name'],
	};
	if (parseInt(category_id) !== 0) {
		conditions.conditions.raw.push(
			`third_categories.category_id = ${category_id}`
		);
		DB.save('users_search', {
			userId: token,
			category_id,
		});
	}
	if (search) {
		conditions.conditions.raw.push(
			`(categories.name like '%${search}%' or third_categories.name like '%${search}%' or sub_categories.name like '%${search}%')`
		);
	}
	if (conditions.conditions.raw.length === 0) {
		delete conditions.conditions;
	}
	const data = await queryProduct(conditions);
	if (search) {
		data.forEach((value) => {
			DB.save('users_search', {
				userId: token,
				category_id: value.category_id,
				third_category_id: value.id,
			});
		});
	}

	return {
		message: 'all products',
		data,
	};
};
const getAllCategory = async () => {
	const data = await DB.find('categories', 'all', {});

	return {
		message: 'all products',
		data,
	};
};
const lastSearch = async ({ token }) => {
	const conditions = {
		conditions: {
			raw: [`userId = '${token}'`],
		},
		join: [
			'third_categories on (third_categories.id =  users_search.third_category_id)',
			'categories on (categories.id =  third_categories.category_id)',
			'sub_categories on (sub_categories.id =  third_categories.sub_category_id)',
		],
		fields: ['third_categories.name', 'sub_categories.name as sub_name'],
		limit: 20,
		orderBy: ['users_search.id desc'],
	};
	const data = await DB.find('users_search', 'all', conditions);
	return {
		message: 'all products',
		data,
	};
};
const reconadedSearch = async ({ token }) => {
	const conditions = {
		conditions: {
			raw: [`userId = '${token}'`],
		},
		limit: 20,
		orderBy: ['users_search.id desc'],
		group: ['category_id'],
	};
	const result = await DB.find('users_search', 'all', conditions);
	let data = result;
	if (data.length === 0) {
		data = await queryProduct({
			join: [
				'categories on (categories.id =  third_categories.category_id)',
				'sub_categories on (sub_categories.id =  third_categories.sub_category_id)',
			],
			fields: ['third_categories.*', 'sub_categories.name as sub_name'],
		});
	} else {
		const ids = [];
		result.forEach((value) => {
			ids.push(`${value.category_id}`);
		});
		data = await queryProduct({
			limit: 20,
			raw: [`category_id in (${ids.join()})`],
			join: [
				'categories on (categories.id =  third_categories.category_id)',
				'sub_categories on (sub_categories.id =  third_categories.sub_category_id)',
			],
			fields: ['third_categories.*', 'sub_categories.name as sub_name'],
			group: ['third_categories.id'],
		});
	}
	return {
		message: 'all products',
		data,
	};
};
module.exports = {
	getAllProducts,
	getAllCategory,
	lastSearch,
	reconadedSearch,
};
