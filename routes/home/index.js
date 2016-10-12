var express = require('express');
var DB = require('./../../lib/DB');
var formatData = require('./../../lib/formatJsonData');
var app = module.exports = express();

app.get('/', function(req, res) {
	res.redirect('http://www.matpriser.nu');
});

app.get('/latest', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	// if(!req.xhr)
	// {
	// 	console.log('no ex');
	// 	return;
	// }
	var DBconnection = DB.dbConnection();
	//var sql = "SELECT * FROM products WHERE ( error = '' AND tags = 'kasse' AND TIMESTAMP = ( SELECT TIMESTAMP FROM products WHERE store != 'pro' ORDER BY TIMESTAMP DESC LIMIT 1 )) OR store = 'pro' ORDER BY NUMBER, store";
	var sql = "SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'coop' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS coop UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'mathem' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS mathem UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'matse' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS matse UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'ica' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS ica UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'willys' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS willys UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'hemkop' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS hemkop UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'pro' ORDER BY NUMBER, TIMESTAMP DESC ) AS pro ORDER BY NUMBER, TIMESTAMP DESC";
	DBconnection.raw(sql)
		.then(function(resp) {
			var data = resp.rows;
			var dataset = formatData.format(data);

			res.send(dataset);

			DBconnection.destroy();
		})
		.catch(function(err) {
			console.error(err);
		});


});

app.get('/latestEko', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	// if(!req.xhr)
	// {
	// 	console.log('no ex');
	// 	return;
	// }
	var DBconnection = DB.dbConnection();
	var sql = "SELECT * FROM products WHERE ( error = '' AND tags = 'eko' AND TIMESTAMP = ( SELECT TIMESTAMP FROM products WHERE store != 'pro' ORDER BY TIMESTAMP DESC LIMIT 1 )) ORDER BY NUMBER, store";
	DBconnection.raw(sql)
		.then(function(resp) {
			var data = resp.rows;
			var dataset = formatData.format(data);

			res.send(dataset);

			DBconnection.destroy();
		})
		.catch(function(err) {
			console.error(err);
		});


});
