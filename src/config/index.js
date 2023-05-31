//DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object. 
const Dotenv = require('dotenv');

Dotenv.config({ silent: true });

module.exports = {
    API_LIMIT: process.env.API_LIMIT || 50,
	APP_ENV: process.env.APP_ENV,
	WEB: process.env.WEB,
	DB: {
		USERNAME: process.env.DB_USERNAME,
		PASSWORD: process.env.DB_PASSWORD,
		NAME: process.env.DB_NAME,
		HOST: process.env.DB_HOST,
		DIALECT: process.env.DB_DIALECT,
		PORT: process.env.DB_PORT
	},
    HTTP_STATUS_CODES: {
		OK: 200,
		CREATED: 201,
		ACCEPTED: 202,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		UNPROCESSABLE_ENTITY: 422,
		TOO_MANY_REQUESTS: 429,
		INTERNAL_SERVER_ERROR: 500,
		BAD_GATEWAY: 502,
		SERVICE_UNAVAILABLE: 503
	},
    dataStatusText: {
		ACTIVE: 1,
		1: 'Active',
		INACTIVE: 0,
		0: 'Inactive',
		DELETED: 2,
		2: 'Deleted',
		NA: 'Unknown'
	},
	pageConfig: {
		DEFAULT: 10,
		USERS: 10,
		PRODUCTS: 10
	}
};