var express = require('express');
var md5 = require('md5');
var connections = require('../../lib/connections.js');
var utils = require('../../lib/utils.js');
var request = require('request');

var app = module.exports = express();

app.get('/fetchIca', function(req,res){
var cloudScrapeRequest = connections.BuildCloudscrapeRequest('https://app.cloudscrape.com/api/executions/0799e5f6-5401-46a4-938f-8326a1ec33c7/result');
console.log(cloudScrapeRequest);
request.get(cloudScrapeRequest, function (error, response, json) {
        if (!error && response.statusCode == 200) {
	    	if (typeof json === "string") {
	                var dataPackage = JSON.parse(json);
	            }
	            else {
	                var dataPackage = json;
	            }
	            var knex = require('knex')({client: 'pg',connection: connections.DBconnection});
	            res.end(dataPackage);
        }
        else{
        	console.log(error);
        	res.end();
        }
    })

});