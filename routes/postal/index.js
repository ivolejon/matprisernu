var express = require('express');
var request = require("request");

var app = module.exports = express();

app.get('/postalcode/matse/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'POST',
		url: 'https://www.mat.se/g/admin/postalCode/updatePostalCode',
		headers: {
			'postman-token': '868a4e1b-08b1-1027-6f14-5ba8f3e57f8a',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
		},
		formData: {
			zipCode: postalCode
		}
	};

	request(options, function(error, response, data) {
		data = JSON.parse(data);
		if (data.status === 'FAILED') {
			res.json('{status:false}');
		} else if (data.status === 'SUCCESS') {
			res.json('{status:true}');
		} else {
			res.json('{status:error}');

		}
	});


});

app.get('/postalcode/mathem/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'GET',
		url: 'https://www.mathem.se/Banner/ValidatePostalCode',
		qs: {
			PostalCode: postalCode
		},
		headers: {
			'postman-token': '22a3cdef-ad49-d670-4d2f-1fce5151a6c2',
			'cache-control': 'no-cache',
			zipcode: postalCode
		}
	};

	request(options, function(error, response, body) {
		var resultTrue = body.search('Vi kan leverera till dig');
		var resultFalse = body.search('Prova ett annat postnummer');
		console.log(resultTrue);
		console.log(resultFalse);
		if (resultTrue > -1) {
			res.json('{status:true}');
		} else if (resultFalse > -1) {
			res.json('{status:false}');
		} else {
			res.json('{status:error}');
		}
	});


});


app.get('/postalcode/coop/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'POST',
		url: 'https://www.coop.se/handla-online/matkasse/',
		qs: {
			method: 'CheckPostalAction'
		},
		headers: {
			'postman-token': '445e2a6d-57a8-38c3-c9f1-f47f2525a6bd',
			'cache-control': 'no-cache',
			'x-requested-with': 'XMLHttpRequest',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
			referer: 'https://www.coop.se/Handla-online/Vanliga-fragor/',
			origin: 'https://www.coop.se',
			host: 'www.coop.se'
		},
		body: '{"postalCode":"' + postalCode + '"}'
	};

	request(options, function(error, response, body) {
		var resultTrue = body.search('Du kan få Coop Matkasse och hela butikssortimentet levererat hem till dörren');
		var resultFalse = body.search('Ingen butik i närheten');
		if (resultTrue > -1) {
			res.json('{status:true}');
		} else if (resultFalse > -1) {
			res.json('{status:false}');
		} else {
			res.json('{status:error}');
		}
	});

});

app.get('/postalcode/willys/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'GET',
		url: 'https://handla.willys.se/axfood/rest/slot/homeDelivery/availability/' + postalCode,
		headers: {
			'postman-token': '3ed39447-6930-ced5-16ed-282e34d15bed',
			'cache-control': 'no-cache'
		}
	};

	request(options, function(error, response, body) {
		var patt = new RegExp(/\d+/);
		var match = patt.test(body);
		console.log(match);
		if (match) {
			res.json('{status:true}');
		} else if (!match) {
			res.json('{status:false}');
		} else {
			res.json('{status:error}');
		}
	});


});

app.get('/postalcode/ica/:code', function(req, res) {
	var postalCode = req.params.code;
	var Horseman = require('node-horseman');
	var horseman = new Horseman({
		loadImages: false
	});

	horseman
		.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
		.open('http://www.ica.se/handla/valj-butik/')
		.evaluate(function() {

			$(document).ajaxSuccess(function(event, xhr, settings) {
				request = JSON.stringify(settings.data);
				if (request.search('&q=&') === -1)
					console.log(JSON.stringify(settings.data) + xhr.responseText)
			});

			$(document).ajaxSend(function(event, request, settings) {
				var temp = settings.data
				pc = $('#searchInput').val();
				settings.data = temp.replace('q=', 'q=' + pc);
			});
		})
		.click('#rd-homedelivery')
		.value('#searchInput', postalCode)
		.click('form.store-search-form.home-delivery-ui button')
		//.close();
	horseman
		.on('consoleMessage', function(msg) {
			horseman.close()
			var resultTrue = msg.search('Butiker som erbjuder hemleverans');
			var resultFalse = msg.search('Vi hittade tyvärr inga');
			if (resultTrue > -1) {
				res.json('{status:true}');
			} else if (resultFalse > -1) {
				res.json('{status:false}');
			} else {
				res.json('{status:error}');
			}
		})
	horseman
		.on('error', function(msg) {
			console.log(msg);
		})
});