//var md5 = require('md5');


var cloudscrapeRequestAuth = {
	cloudScrapeAcountId: '35c0d709-0618-4f49-95c0-0daee86a3be4',
	cloudScrapeAccessId: '0f0440d69226de91f1e0d3fcc6ff90db'
};


var storesURL = {
	ica: 'https://app.cloudscrape.com/api/runs/e55c911d-82a8-4904-bf8d-235290f90a58/latest/result',
	mathem: 'https://app.cloudscrape.com/api/runs/3ad81f5d-98fe-427d-a7e9-aa877394756f/latest/result',
	coop: 'https://app.cloudscrape.com/api/runs/7a566040-aa85-4cb3-b04c-8b71a6024c90/latest/result',
	matse: 'https://app.cloudscrape.com/api/runs/f6639fb9-b336-40ac-889d-a8dc00d73e44/latest/result'
};


// var databaseUrl = {
// 	databaseUrl: 'postgres://vlgdvrraqoudbd:8eiWIbm9hU6rffXsobL0ESFLJI@ec2-54-217-238-100.eu-west-1.compute.amazonaws.com:5432/d9kqt3hd2ca6f?ssl=true'
// };




var BuildCloudscrapeRequest = function(endpointURL) {
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


module.exports = {
	switchStores: function(store) {
		switch (store) {
			case 'ica':
				return new BuildCloudscrapeRequest(storesURL.ica);
			case 'mathem':
				return new BuildCloudscrapeRequest(storesURL.mathem);
			case 'matse':
				return new BuildCloudscrapeRequest(storesURL.matse);
			case 'coop':
				return new BuildCloudscrapeRequest(storesURL.coop);

		}
	}
};