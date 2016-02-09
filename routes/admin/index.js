var express = require('express');
var app = module.exports = express();
var DB = require('./../../lib/DB');

app.get('/admin', function(req, res) {
	var DBconnection = DB.dbConnection();
	var sql ="SELECT timestamp, batch FROM products WHERE batch NOTNULL GROUP BY batch, timestamp ORDER BY timestamp DESC";
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

app.get('/admin/view/:batch', function(req, res) {
	var batch = req.params.batch;
	console.log('Tittar på batch '+batch);
	var DBconnection = DB.dbConnection();
	var sql ="SELECT * FROM products WHERE batch ='"+batch+"'";
	DBconnection.raw(sql)
		.then(function(resp) {
				DBconnection.destroy();
			res.redirect('/admin')
			
		})
		.catch(function(err) {
			console.error(err);
		});
	
	});

