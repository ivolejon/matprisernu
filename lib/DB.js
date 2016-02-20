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
		user: process.env.dbuser, // info från heroku
		password: process.env.dbpass, // info från heroku
		database: process.env.dbname, // info från heroku
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