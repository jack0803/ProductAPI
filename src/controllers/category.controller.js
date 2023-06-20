const responseHelper = require('../helper/response.js');
const { CATEGORY } = require('../helper/responseMassages.js');
const categoryService = require('../services/categoryService.js');

const createCategory = async (req , res , next) => {
	
	try {
		console.log("in controller");
		const { body , params } = req;
		console.log(req.body);
		const result = await categoryService.create(body , params );
		
		if(result.error) {
			console.log("controller error");
			console.log("out controller");
			console.log("--------------------------------------");
			return responseHelper.badRequestError(res, result.message);
		} else {
			console.log("out controller");
			console.log("--------------------------------------");
			return responseHelper.success(res, CATEGORY.CREATED_SUCCESS);
		}
		
	} catch (error) {
		return responseHelper.serverError(res, error);		
	}
}

const listCategory = async (req, res, next) => {

	const info = {
		queryData: req.query
	};

	try {
		const { body, params } = req;
		
		const result = await categoryService.list(body, params , info);
		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, CATEGORY.FETCH_SUCCESS, { result: result.data, totalRows: result.totalRows, currentPage: result.currentPage, totalPages: result.totalPages });
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const viewByCategoryId = async (req, res, next) => {
	try {
		const { body, params } = req;
		console.log(params);
		const info = {
			sku: params || null
		};
		const result = await categoryService.viewByCategoryId(body, params, info);

		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, CATEGORY.FETCH_SUCCESS, result.data);
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const viewByCategoryName = async (req, res, next) => {
	try {
		console.log("in controller try ");
		const { body, params } = req;
		const result = await categoryService.viewByCategoryName(body, params);

		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, CATEGORY.FETCH_SUCCESS, result.data);
		}
	} catch (error) {
		return responseHelper.serverError(res, error);
	}
};

const updateCategory = async (req, res, next) => {
	try {
		const { body, params } = req;
		console.log("in controller try ");
		console.log(body);
		console.log(params);
		const result = await categoryService.update(body, params);
		if (result.error) {
			console.log("error");
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, CATEGORY.UPDATED_SUCCESS);
		}
	} catch (e) {
		return responseHelper.serverError(res, error);
	}
};

const deleteCategoryById = async (req, res, next) => {
	try {
		const { body, params } = req;
		
		const result = await categoryService.deleteById(body, params);
		if (result.error) {
			return responseHelper.badRequestError(res, result.message);
		} else {
			return responseHelper.success(res, CATEGORY.DELETED_SUCCESS);
		}
	} catch (e) {
		return responseHelper.serverError(res, error);
	}
};

module.exports = {
    createCategory ,
    viewByCategoryName , 
    viewByCategoryId , 
    listCategory , 
    updateCategory , 
    deleteCategoryById
}