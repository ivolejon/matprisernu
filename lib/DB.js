var connections = require('./connections.js');
var pg = require('knex');

var connection;
if (process.env.PORT === undefined) {
	//env = 'development';
	connection = {
		host: 'localhost',
		user: 'ivolejon',
		password: '',
		database: 'postgres',
		ssl: false,
		port: 5432
	};
} else {
	//env = 'production';
	connection = {
		host: 'ec2-54-217-238-100.eu-west-1.compute.amazonaws.com',
		user: 'vlgdvrraqoudbd',
		password: '8eiWIbm9hU6rffXsobL0ESFLJI',
		database: 'd9kqt3hd2ca6f',
		ssl: true,
		port: 5432
	};
}
console.log(connection);



module.exports = {
	dbConnection: function() {

		var knex = require('knex')({
			client: 'pg',
			connection: connection

		});
		return knex;
	}
};