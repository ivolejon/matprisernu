var scrapers = require('./scrapers').getAllScrapers();
var json2SQL = require('./json2sql');
var request = require('request');
var async = require('async');
var uuid = require('uuid');
var moment = require('moment');


var exports = module.exports = {};

var cloudscrapeRequestAuth = {
	cloudScrapeAcountId: '35c0d709-0618-4f49-95c0-0daee86a3be4',
	cloudScrapeAccessId: '0f0440d69226de91f1e0d3fcc6ff90db'
};

buildCloudscrapeRequest = function(endpointURL) {
	return {
		url: endpointURL,
		headers: {
			'X-CloudScrape-Access': cloudscrapeRequestAuth.cloudScrapeAccessId,
			'X-CloudScrape-Account': cloudscrapeRequestAuth.cloudScrapeAcountId,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'User-Agent': 'matpriser.nu'
		}

	};
};

exports.fetch = function(sql_callback){
	var now = moment();
	var timestamp = now.format('YYYY-MM-DD HH:mm:ss Z');
	var batch = uuid.v1();
	var sqlBatch = '';
	async.forEachOfSeries(scrapers, function(scraper, key, callback) {
		console.log('> Hämtar från ' + scraper.name);
		console.log(buildCloudscrapeRequest(scraper.cloudScrapeUrl));
		request.get(buildCloudscrapeRequest(scraper.cloudScrapeUrl), function(error, response, json) {
			if (!error && response.statusCode == 200) {
				if (typeof json === "string") {
					var dataPackage = JSON.parse(json);
				} else {
					var dataPackage = json;
				}
				sqlBatch = sqlBatch + json2SQL.convertJsonToInsertSQL(dataPackage, scraper.name, batch, timestamp, scraper.tags);
				callback();
			} else {
				console.log(error);
			}
		});
		
	},function done(){
		//console.log(sqlBatch)
		sql_callback(sqlBatch);
	}); // hämtat data och konverterat till SQL från samtliga scrapers
};
