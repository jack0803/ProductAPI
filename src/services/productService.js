const product = require('../models/product.model.js');
const { HTTP_STATUS_CODES, dataStatusText, pageConfig } = require('../config/index.js');
const { getCurrentTimestamp, convertTimestampToDate , processString } = require('../utils/data.utils.js');
const { PRODUCT , errorMessages } = require('../helper/responseMassages.js');

const create = async (data , params) => {
    let result = {
		error: false,
		data: {}
	};
	console.log("inside service");

    try {
        //first we have to check weather the product already listed or not
        //---------------------
        const productExist = await product.viewById(data.sku);
		if(!productExist){
			//add new product to databse
			console.log("try service");
			const qdata = await product.create({
				sku: data.sku,
				name: data.name.toString().toLowerCase().replace(/\s+/g, ' ').trim(),
				description: data.description,
				status: dataStatusText.ACTIVE,
				created_at: convertTimestampToDate(),
				updated_at: convertTimestampToDate(),
			});
			result.data = qdata;
			console.log(result.data);
		}else{
			console.log("inside else------>");
			result.error = true;
			result.status = HTTP_STATUS_CODES.BAD_REQUEST;
			result.message = PRODUCT.PRODUCT_EXISTS;
		}
        
    } catch (error) {
		console.log("sevice error");
        result.error = true;
		result.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
		result.message = error.message;
    }
	console.log("out service");
    return result;
};

const list = async (data, params , info) => {
	const result = {
		error: false,
		data: {},
		totalRows: '',
		currentPage: '',	
		totalPages: ''
	};
	const page = info.queryData && info.queryData.page ? info.queryData.page : '';
	const limit = info.queryData && info.queryData.limit ? info.queryData.limit : '';
	try {
		const qData = await product.list(page, limit , info);
		result.data = [];
		qData.data.forEach(data => {
			result.data.push({
				sku: data.sku,
				name: data.name,
                description: data.description,
				status: dataStatusText[data.status] || dataStatusText.NA,
                created_at: data.created_at,
				updated_at: data.updated_at
			});
		});
		result['totalRows'] = Number(qData.totalRows);
		result['currentPage'] = Number(page);
		result['totalPages'] = Number(Math.ceil(Number(qData.totalRows) / pageConfig.PRODUCTS));
	} catch (e) {
		result.error = true;
		result.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
		result.message = e.message;
	}
	return result;
};

const viewById = async (data, params, info) => {
	const result = {
		error: false,
		data: {}
	};
	const id = Number(params.id) || 0;
	//get data
	try {
		const qData = await product.viewById(id);
		if (qData) {
			(qData.status = dataStatusText[qData.status] || dataStatusText.NA),
				(qData.created_at = convertTimestampToDate(qData.created_at)),
				(qData.updated_at = convertTimestampToDate(qData.updated_at));
			result.data = qData;
		} else {
			result.error = true;
			result.status = dataStatusText.NOT_FOUND;
			result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
		}
	} catch (e) {
		result.error = true;
		result.status = dataStatusText.INTERNAL_SERVER_ERROR;
		result.message = e.message;
	}
	return result;
};

const viewByName = async (data, params) => {
	const result = {
		error: false,
		data: {}
	};
	const name = processString(params.name);
	console.log("in service");
	//get data
	try {
		const qData = await product.viewByName(name);
		if (qData) {
			(qData.status = dataStatusText[qData.status] || dataStatusText.NA),
				(qData.created_at = convertTimestampToDate(qData.created_at)),
				(qData.updated_at = convertTimestampToDate(qData.updated_at));
			result.data = qData;
		} else {
			result.error = true;
			result.status = dataStatusText.NOT_FOUND;
			result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
		}
	} catch (e) {
		result.error = true;
		result.status = dataStatusText.INTERNAL_SERVER_ERROR;
		result.message = e.message;
	}
	return result;
};

const update = async (data, params) => {
	let result = {
		error: false,
		data: {}
	};

	const id = Number(params.id) || 0;
	console.log(id);
	//save data
	try {
		console.log("sevice try");
		const qData = await product.viewById(id);
		console.log(qData);
		if (qData) {
			console.log("in if");
			const saveData = await product.update(id, {
				sku: data.sku || qData.id,
				name: data.name || qData.name,
                description: data.description || qData.description,
				status: dataStatusText[data.status] || qData.status,
				updated_at: convertTimestampToDate(),
			});
			result.data = saveData;
			console.log(saveData);
		} else {
			console.log("error service");
			result.error = true;
			result.status = dataStatusText.NOT_FOUND;
			result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
		}
	} catch (error) {
		console.log("sevice error");
		result.error = true;
		result.status = dataStatusText.INTERNAL_SERVER_ERROR;
		result.message = error.message;
	}
	return result;
};

const deleteById = async (data, params, info) => {
	const result = {
		error: false,
		data: {}
	};
	const id = Number(params.id) || 0;
	//save data
	try {
		const qData = await product.viewById(id);
		if (qData) {
			const saveData = await product.deleteById(id, {
				updated_at: convertTimestampToDate(),
			});
			result.data = saveData;
		} else {
			result.error = true;
			result.status = dataStatusText.NOT_FOUND;
			result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
		}
	} catch (e) {
		result.error = true;
		result.status = dataStatusText.INTERNAL_SERVER_ERROR;
		result.message = e.message;
	}
	return result;
};

module.exports = {
    create,
	list,
	viewById,
	viewByName,
	update,
	deleteById
}

