var express = require('express');
var request = require('request');

var app = module.exports = express();

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


app.get('/postalcode/matkasse/klaramaten/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'POST',
		url: 'http://klaramaten.se/wp-admin/admin-ajax.php',
		headers: {
			'postman-token': 'f0d2f4ce-5a79-885e-e5dd-03c5c9119bf1',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
		},
		formData: {
			action: 'try_zip',
			zip: postalCode
		}
	};

	request(options, function(error, response, data) {
		data = data.toString();
		if (data !== '1') {
			res.json('{"status":false}');
		} else if (data === '1') {
			res.json('{"status":true}');
		} else {
			res.json('{"status":"error"}');

		}
	});


});


app.get('/postalcode/matkasse/gastrofy/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'GET',
		url: 'https://www.gastrofy.se/api/zip/checkzip',
		qs: {
			zip_code: postalCode
		},
		headers: {
			'postman-token': '024ed414-7550-b8f5-ce8c-a09ba7bb8021',
			'cache-control': 'no-cache'
		}
	};

	request(options, function(error, response, data) {
		data = JSON.parse(data);
		if (data.result === true) {
			res.json('{"status":true}');
		} else if (data.error === true) {
			res.json('{"status":false}');
		} else {
			res.json('{"status":"error"}');

		}
	});


});


app.get('/postalcode/matkasse/giboxen/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'GET',
		url: 'https://www.giboxen.se/Bestall/',
		qs: {
			CheckZipCode: postalCode
		},
		headers: {
			'postman-token': 'ae15d82d-15e9-9567-6ea6-7518d0fd2489',
			'cache-control': 'no-cache'
		}
	};

	request(options, function(error, response, body) {
		var resultTrue = body.search('Ja, vi levererar i ditt område!');
		var resultFalse = body.search('Vi levererar tyvärr inte till denna ort ännu');
		console.log(resultTrue);
		console.log(resultFalse);
		if (resultTrue > -1) {
			res.json('{"status":true}');
		} else if (resultFalse > -1) {
			res.json('{"status":false}');
		} else {
			res.json('{"status":"error"}');
		}
	});


});


app.get('/postalcode/matkasse/linas/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'POST',
		url: 'https://api.linasmatkasse.se/postcode',
		headers: {
			'postman-token': 'a0dec694-93fe-8afe-5f6d-deb3bd18e735',
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
		},
		formData: {
			postcode: postalCode
		}
	};

	request(options, function(error, response, data) {
		if (IsJsonString(data)) {
			data = JSON.parse(data);
			if (data.DeliveryStatus === 'Yes') {
				res.json('{"status":true}');
			} else {
				res.json('{"status":false}');
			}
		} else {
			res.json('{"status":false}');
		}



	});
});



app.get('/postalcode/matkasse/matkomfort/:code', function(req, res) {
	var postalCode = req.params.code;
	var options = {
		method: 'GET',
		url: 'https://www.matkomfort.se/backapi/zipcode/'+postalCode,
		headers: {
			'postman-token': '5fa5c0c8-7d38-f9b0-84e1-be777d3b2178',
			'cache-control': 'no-cache'
		}
	};

	request(options, function(error, response, data) {
		data = JSON.parse(data);
		if (data.zipcodeStatus === 1) {
			res.json('{"status":true}');
		} else if (data.zipcodeStatus === 3) {
			res.json('{"status":false}');
		} else {
			res.json('{"status":"error"}');

		}
	});


});