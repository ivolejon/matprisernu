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
	var sql = "SELECT *, product_price :: NUMERIC (8, 2) AS formated_product_price FROM products WHERE TIMESTAMP = ( SELECT TIMESTAMP FROM products WHERE store != 'pro' ORDER BY TIMESTAMP DESC LIMIT 1 ) OR store = 'pro' ORDER BY NUMBER, store";
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