var express = require('express');
var Converter = require('csvtojson').Converter;
	var http = require('https');
	var iconv = require('iconv-lite');


var app = module.exports = express();

app.get('/proxy/:run', function(req, res) {
	console.log('Startar hämtning från Dexi.io')
	var run = req.params.run;
	var options = {
		host: 'api.dexi.io',
		path: '/runs/'+run+'/latest/result?format=csv',
		headers: {
			'X-CloudScrape-Access': '0f0440d69226de91f1e0d3fcc6ff90db',
			'X-CloudScrape-Account': '35c0d709-0618-4f49-95c0-0daee86a3be4'

		}
	};

	callback = function(response) {
		var chunks = [];
		response.on('data', function(chunk) {
			chunks.push(chunk);
		});

		response.on('end', function() {
			var buffer = Buffer.concat(chunks);
			var str = iconv.decode(buffer, 'windows-1252');
		
			var converter = new Converter({});
			converter.fromString(str, function(err, result) {
						res.send(result);
		
		});
		});
	}

	http.request(options, callback).end();
	
});