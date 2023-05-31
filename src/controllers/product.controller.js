const bodyParser = require('body-parser');
const responseHelper = require('../helper/response.js');
const { PRODUCT } = require('../helper/responseMassages.js');
const productService = require('../services/productService.js');
const welcome = (req, res, next) => {
	try {
		return responseHelper.success(res, "Welcome to the store!");
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
}

const create = async (req , res , next) => {
	
	try {
		console.log("in controller");
		const { body , params } = req;
		console.log(req.body);
		const result = await productService.create(body , params );
		
		if(result.error) {
			console.log("controller error");
			console.log("out controller");
			console.log("--------------------------------------");
			return responseHelper.badRequestError(res, result.message);
		} else {
			console.log("out controller");
			console.log("--------------------------------------");
			return responseHelper.success(res, PRODUCT.CREATED_SUCCESS);
		}
		
	} catch (error) {
		return responseHelper.serverError(res, error);		
	}
}

const list = async (req, res, next) => {

	const info = {
		queryData: req.query
	};

	try {
		const { body, params } = req;
		
		const result = await productService.list(body, params , info);
		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, PRODUCT.FETCH_SUCCESS, { result: result.data, totalRows: result.totalRows, currentPage: result.currentPage, totalPages: result.totalPages });
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const viewById = async (req, res, next) => {
	try {
		const { body, params } = req;
		console.log(params);
		const info = {
			sku: params || null
		};
		const result = await productService.viewById(body, params, info);

		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, PRODUCT.FETCH_SUCCESS, result.data);
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const viewByName = async (req, res, next) => {
	try {
		console.log("in controller try ");
		const { body, params } = req;
		const result = await productService.viewByName(body, params);

		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, PRODUCT.FETCH_SUCCESS, result.data);
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const update = async (req, res, next) => {
	try {
		const { body, params } = req;
		console.log("in controller try ");
		console.log(body);
		console.log(params);
		const result = await productService.update(body, params);
		if (result.error) {
			console.log("error");
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, PRODUCT.UPDATED_SUCCESS);
		}
	} catch (e) {
		return responseHelper.serverError(res, error);
	}
};

const deleteById = async (req, res, next) => {
	try {
		const { body, params } = req;
		
		const result = await productService.deleteById(body, params);
		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, PRODUCT.DELETED_SUCCESS);
		}
	} catch (e) {
		return responseHelper.serverError(res, error);
	}
};

module.exports = {
	create,
	welcome,
	list,
	viewById,
	viewByName,
	update,
	deleteById
}