const { dbConnection } = require('../db/config.js');
const { dataStatusText, pageConfig } = require('../config/index.js');
const { viewByCategoryName } = require('../models/category.model.js');

const tableName = 'products';
const tableName2 = 'categories';

const create = async data => {
	console.log("in model");
    const query = `INSERT INTO ${tableName} (sku , name , description , status , created_at , updated_at , category_sku) VALUES (? , ? , ? , ? , ? , ? , ?)`;
	console.log(data.description);
	console.log(data.name);

    const params = [data.sku , data.name , data.description , data.status, data.created_at , data.updated_at , data.category_sku];

    const qData = await dbConnection.query(query , params);

	console.log("out model");
    return qData.insertId || null;
};

const list = async (page, limit , category_sku, category_name, info) => {
	const qData = {
		data: [],
		totalRows: ''
	};
	let limitString = '';
	let query_str = '';
	if(category_sku){
		query_str = ' && category_sku =?';
	}else if(category_name){
		console.log("inside");
		console.log(category_name);
		//first we have to find name from category table and from that we are able to find the category_sku of category
		const temp = await viewByCategoryName(category_name);
		if(temp){
			console.log("temp:"+temp);
			query_str = ` && category_sku =${temp.sku}`;
		}
		
	}

	if (page) {
		console.log("inside page");
		const countQuery = `SELECT count(id) as total from ${tableName} where status !=? `;
		const countParams = [dataStatusText.DELETED];
		const countData = await dbConnection.query(countQuery, countParams);
		qData['totalRows'] = Number(countData[0]['total']);
		const possiblePage = Math.ceil(pageConfig.PRODUCTS/limit);
		const offset = (page-1)*limit;
		limitString = `LIMIT ${limit} OFFSET ${offset}`;
		console.log(pageConfig.PRODUCTS);
	}
	// mqsql qurey to join the tables
	// SELECT * FROM product INNER JOIN category ON product.category_sku=category.sku;
	const query = `SELECT * from ${tableName} INNER JOIN ${tableName2} ON ${tableName}.category_sku=${tableName2}.sku where ${tableName}.status !=? ${query_str} ${limitString} `;
	const params = [dataStatusText.DELETED , category_sku];
	const resultData = await dbConnection.query(query, params);
	qData['data'] = resultData || [];
	return qData;
};

const viewById = async id => {
	// const query = `SELECT first_name, last_name, email, type, photo, status, created_at, updated_at FROM ${tableName} WHERE user_id=? and status!=?`;
	const query = `SELECT sku,name,description,status,created_at,updated_at FROM ${tableName} WHERE sku=?`;
	const params = [id, dataStatusText.DELETED];
	const qData = await dbConnection.query(query, params);
	return qData[0] || null;
};

const viewByName = async id => {
	// const query = `SELECT first_name, last_name, email, type, photo, status, created_at, updated_at FROM ${tableName} WHERE user_id=? and status!=?`;
	const query = `SELECT sku,name,description,status,created_at,updated_at FROM ${tableName} WHERE name=?`;
	const params = [id, dataStatusText.DELETED];
	const qData = await dbConnection.query(query, params);
	return qData[0] || null;
};

const update = async (id, data) => {
	const query = `UPDATE ${tableName} SET sku=?,name=?,description=?,status=?,updated_at=?,category_sku=? where sku=?`;

	const params = [data.sku, data.name, data.description, data.status, data.updated_at, data.category_sku,id];

	const qData = await dbConnection.query(query, params);
	return qData.affectedRows || null;
};

const deleteById = async (id, data) => {
	const query = `UPDATE ${tableName} SET status = ?, updated_at = ? WHERE sku = ?`;
	const params = [dataStatusText.DELETED, data.updated_at, id];

	const qData = await dbConnection.query(query, params);
	return qData.affectedRows || null;
};

module.exports = {
    create,
    list,
    viewById,
    viewByName,
	update,
	deleteById
}