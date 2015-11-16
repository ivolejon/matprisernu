var connections = require('./connections.js');
var pg = require('knex');



module.exports = {
	dbConnection: function() {
		var knex = require('knex')({
			client: 'pg',
			connection: {
				host: 'ec2-54-217-238-100.eu-west-1.compute.amazonaws.com',
				user: 'vlgdvrraqoudbd',
				password: '8eiWIbm9hU6rffXsobL0ESFLJI',
				database: 'd9kqt3hd2ca6f',
				ssl: true,
				port: 5432
			}

		});
return knex;
	}
};