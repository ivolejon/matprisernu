var express = require('express');
var DB = require('./../../lib/DB');
var cloudScrape = require('./../../lib/cloudscrape');

var app = module.exports = express();

app.get('/fetch', function(req, res) {
	
	cloudScrape.fetch(function(sql) {
		var DBconnection = DB.dbConnection();
		DBconnection.raw(sql)
			.then(function(resp) {
				console.log('Data sparad i databasen');
				DBconnection.destroy();
				res.redirect('/admin');
			})
			.catch(function(err) {
				console.error(err);
			});
	});



});