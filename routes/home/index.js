var express = require('express');
var app = module.exports = express();
var DB = require('./../../lib/DB');
var _ = require('underscore');

app.get('/', function(req,res){
	res.redirect('http://www.matpriser.nu')
})

app.get('/latest', function(req, res) {
res.setHeader('Content-Type', 'application/json');
	// if(!req.xhr)
	// {
	// 	console.log('no ex');
	// 	return;
	// }
	var DBconnection = DB.dbConnection();
	var sql = "SELECT *, product_price :: NUMERIC (8, 2) AS formated_product_price, ( SELECT SUM (product_price) AS total_cost0 FROM produkt_v1 WHERE store = 'coop' ) :: NUMERIC (8, 2) AS total_coop, ( SELECT SUM (product_price) + 49.00 AS total_cost0 FROM produkt_v1 WHERE store = 'coop' ) :: NUMERIC (8, 2) AS total_coop_shipping, ( SELECT SUM (product_price) AS total_cost1 FROM produkt_v1 WHERE store = 'matse' ) :: NUMERIC (8, 2) AS total_matse, ( SELECT SUM (product_price) + 0 AS total_cost1 FROM produkt_v1 WHERE store = 'matse' ) :: NUMERIC (8, 2) AS total_matse_shipping, ( SELECT SUM (product_price) AS total_cost2 FROM produkt_v1 WHERE store = 'ica' ) :: NUMERIC (8, 2) AS total_ica, ( SELECT SUM (product_price) + 99.00 AS total_cost2 FROM produkt_v1 WHERE store = 'ica' ) :: NUMERIC (8, 2) AS total_ica_shipping, ( SELECT SUM (product_price) AS total_cost3 FROM produkt_v1 WHERE store = 'mathem' ) :: NUMERIC (8, 2) AS total_mathem, ( SELECT SUM (product_price) + 29.00 AS total_cost3 FROM produkt_v1 WHERE store = 'mathem' ) :: NUMERIC (8, 2) AS total_mathem_shipping, ( SELECT SUM (product_price) AS total_cost3 FROM produkt_v1 WHERE store = 'pro' ) :: NUMERIC (8, 2) AS total_pro FROM produkt_v1 WHERE DATE = ( SELECT DATE FROM produkt_v1 WHERE store != 'pro' ORDER BY DATE DESC LIMIT 1 ) OR store = 'pro' ORDER BY NUMBER, CASE WHEN store = 'coop' THEN 1 WHEN store = 'mathem' THEN 2 WHEN store = 'matse' THEN 3 WHEN store = 'ica' THEN 4 WHEN store = 'pro' THEN 5 END"
	DBconnection.raw(sql)
		.then(function(resp) {
			var data = resp.rows;
			var dataset = {};
			var uniqProducts = _.uniq(data, function(obj) {
				return obj.number;
			});
			uniqProducts = _.map(uniqProducts, function(obj) {
				return _.pick(obj, 'product_name', 'number');
			});
			uniqProducts = _.each(uniqProducts, function(obj) {
				var number = obj.number;

				var temp = _.where(data, {
					number: number,
					store: 'coop'
				});
				obj.price_coop = temp[0].formated_product_price;
				var temp = _.where(data, {
					number: number,
					store: 'mathem'
				});
				obj.price_mathem = temp[0].formated_product_price;
				var temp = _.where(data, {
					number: number,
					store: 'matse'
				});
				obj.price_matse = temp[0].formated_product_price;
				var temp = _.where(data, {
					number: number,
					store: 'ica'
				});
				obj.price_ica = temp[0].formated_product_price;
				var temp = _.where(data, {
					number: number,
					store: 'pro'
				});
				obj.price_pro = temp[0].formated_product_price;
				return obj;
			});

			dataset.products = uniqProducts;
			dataset.totals = {};
			dataset.totals.total_coop = parseFloat(data[0].total_coop).toFixed();
			dataset.totals.total_mathem = parseFloat(data[0].total_mathem).toFixed();
			dataset.totals.total_ica = parseFloat(data[0].total_ica).toFixed();
			dataset.totals.total_matse = parseFloat(data[0].total_matse).toFixed();
			dataset.totals.total_pro = parseFloat(data[0].total_pro).toFixed();
			dataset.totals.total_coop_shipping = parseFloat(data[0].total_coop_shipping).toFixed();
			dataset.totals.total_mathem_shipping = parseFloat(data[0].total_mathem_shipping).toFixed();
			dataset.totals.total_matse_shipping = parseFloat(data[0].total_matse_shipping).toFixed();
			dataset.totals.total_ica_shipping = parseFloat(data[0].total_ica_shipping).toFixed();
			dataset.totals.total_pro_shipping = parseFloat(data[0].total_pro_shipping).toFixed();

			res.send(dataset);
			
			DBconnection.destroy();
		})
		.catch(function(err) {
			console.error(err);
		});


});