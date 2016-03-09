var express = require('express');
var app = module.exports = express();
var DB = require('./../../lib/DB');
var store = require('./../../lib/scrapers');
var formatData = require('./../../lib/formatjsondata');

app.get('/test', function(req, res) {
 res.send(store.getAllScrapers());
})

app.get('/admin', function(req, res) {
	var DBconnection = DB.dbConnection();
	var sql ="SELECT TIMESTAMP, batch FROM products WHERE LENGTH (batch) > 0 GROUP BY batch, TIMESTAMP ORDER BY TIMESTAMP DESC";
	DBconnection.raw(sql)
		.then(function(resp) {
			var data = resp.rows;
			res.render('admin', {objects : data});
			DBconnection.destroy();
		})
		.catch(function(err) {
			console.error(err);
		});
});

app.get('/admin/deleteBatch/:batch', function(req, res) {
	var batch = req.params.batch;
	console.log('Raderar batch '+batch);
	var DBconnection = DB.dbConnection();
	var sql ="DELETE FROM products WHERE batch = '"+batch+"'";
	DBconnection.raw(sql)
		.then(function(resp) {
			DBconnection.destroy();
			res.redirect('/admin')
			
		})
		.catch(function(err) {
			console.error(err);
		});
	
	});

app.get('/admin/clearErrors/:batch', function(req, res) {
	var batch = req.params.batch;
	console.log('Rensar batch '+batch);
	var DBconnection = DB.dbConnection();
	var sql ="DELETE FROM products WHERE batch = '"+batch+"' AND LENGTH (error) > 0";
	DBconnection.raw(sql)
		.then(function(resp) {
				DBconnection.destroy();
			res.redirect('/admin')
			
		})
		.catch(function(err) {
			console.error(err);
		});
	
	});

app.get('/admin/view/:batch/:style', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	var batch = req.params.batch;
	var style = req.params.style;
	console.log('Tittar på batch '+batch);
	var DBconnection = DB.dbConnection();
	var sql = "SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'coop' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS coop UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'mathem' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS mathem UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'matse' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS matse UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'ica' AND error = '' ORDER BY NUMBER, TIMESTAMP DESC ) AS ica UNION SELECT * FROM ( SELECT DISTINCT ON (NUMBER) * FROM products WHERE store = 'pro' ORDER BY NUMBER, TIMESTAMP DESC ) AS pro ORDER BY NUMBER, TIMESTAMP DESC";
	//var sql ="SELECT *, product_price :: NUMERIC (8, 2) AS formated_product_price FROM products WHERE store = 'pro' OR batch = '"+batch+"' ORDER BY NUMBER, store";
	DBconnection.raw(sql)
		.then(function(resp) {
				DBconnection.destroy();
			if(style === 'raw'){
				var dataset = resp.rows;
				res.render('viewDatasetRaw', {objects : dataset});
			}
			else if(style === 'clean'){
				var dataset = formatData.format(resp.rows);
				console.log(dataset);
				res.render('viewDatasetClean', {objects : dataset});
			}
			
		})
		.catch(function(err) {
			console.error(err);
		});
	
	});

