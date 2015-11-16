var express = require('express');
var connections = require('../../lib/connections');
var DB = require('../../lib/DB');
var json2SQL = require('../../lib/Json2SQL');
var request = require('request');
var async = require('async');
var uuid = require('uuid');
var app = module.exports = express();

app.get('/fetch', function(req, res) {
	
//var event = new EventSender(res);
//	event.send({data: 'Hello, World!'});
	var batch = uuid.v1();
	var stores = {
		1: 'ica',
		2: 'mathem',
		3: 'matse',
		4: 'coop'
	};
	async.forEachOfSeries(stores, function(value, key, callback) {

		currentStore = value;

		console.log('Hämtar från ' + currentStore);

		var cloudScrapeRequest = connections.switchStores(currentStore);

		request.get(cloudScrapeRequest, function(error, response, json) {
			if (!error && response.statusCode == 200) {
				if (typeof json === "string") {
					var dataPackage = JSON.parse(json);
				} else {
					var dataPackage = json;
				}
				var sqlString = json2SQL.convertJsonToInsertSQL(dataPackage, currentStore,batch);
				var DBconnection = DB.dbConnection();

				DBconnection.raw(sqlString)
					.then(function(resp) {
						console.log('Hämtat klart från ' + currentStore)
						DBconnection.destroy();
						callback();
					})
					.catch(function(err) {
						console.error(err);
					});

			} else {
				console.log('no data');
				res.end();
			}
		});

	}, function() {
		console.log('Hämatat från alla affärer');
		res.render('fetch', {
		layout: 'admin'
	}); 
	}); //forEachSeries
});