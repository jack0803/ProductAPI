const { DB } = require('../config/index.js');
const util = require('util');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const { log } = require('console');

const dbConnection = mysql2.createConnection({
	host: DB.HOST,
	user: DB.USERNAME,
	password: DB.PASSWORD,
	database: DB.NAME,
	port: DB.PORT
});

dbConnection.connect(error => {
	if (error) {
		console.log(error);
	}
	else{
		console.log('Connected to DB');
	}
});

dbConnection.query = util.promisify(dbConnection.query);
module.exports = { 
	dbConnection
}