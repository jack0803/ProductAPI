const { dbConnection } = require('../db/config.js');
const { dataStatusText, pageConfig } = require('../config/index.js');

const tableName = 'product';

const create = async data => {
	console.log("in model");
    const query = `INSERT INTO ${tableName} (sku , name , description , status , created_at , updated_at) VALUES (? , ? , ? , ? , ? , ?)`;
	console.log(data.description);
	console.log(data.name);

    const params = [data.sku , data.name , data.description , data.status, data.created_at , data.updated_at];

    const qData = await dbConnection.query(query , params);

	console.log("out model");
    return qData.insertId || null;
};

const list = async (page, limit , info) => {
	const qData = {
		data: [],
		totalRows: ''
	};
	let limitString = '';
	let query_str = '';

	if (page) {
		console.log("inside page");
		const countQuery = `SELECT count(id) as total from ${tableName} where status !=? ${query_str}`;
		const countParams = [dataStatusText.DELETED];
		const countData = await dbConnection.query(countQuery, countParams);
		qData['totalRows'] = Number(countData[0]['total']);
		const possiblePage = Math.ceil(pageConfig.PRODUCTS/limit);
		const offset = (page-1)*limit;
		limitString = `LIMIT ${limit} OFFSET ${offset}`;
		console.log(pageConfig.PRODUCTS);
	}

	const query = `SELECT sku,name,description,status,created_at,updated_at from ${tableName} where status !=? ${limitString} `;
	const params = [dataStatusText.DELETED];
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
	const query = `UPDATE ${tableName} SET sku=?,name=?,description=?,status=?,updated_at=? where sku=?`;

	const params = [data.sku, data.name, data.description, data.status, data.updated_at, id];

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