//var md5 = require('md5');


var cloudscrapeRequestAuth = {
	cloudScrapeAcountId: '35c0d709-0618-4f49-95c0-0daee86a3be4',
	cloudScrapeAccessId: '0f0440d69226de91f1e0d3fcc6ff90db'
};


var storesURL = {
	ica: 'https://app.cloudscrape.com/api/runs/e55c911d-82a8-4904-bf8d-235290f90a58/latest/result',
	mathem: 'https://app.cloudscrape.com/api/runs/3ad81f5d-98fe-427d-a7e9-aa877394756f/latest/result',
	coop: 'https://app.cloudscrape.com/api/runs/7a566040-aa85-4cb3-b04c-8b71a6024c90/latest/result',
	matse: 'https://app.cloudscrape.com/api/runs/f6639fb9-b336-40ac-889d-a8dc00d73e44/latest/result',
	icaEko: 'https://app.cloudscrape.com/api/runs/4fe8784d-6498-420d-8178-b3af6cf49d62/latest/result',
	coopEko: 'https://app.cloudscrape.com/api/runs/468b1484-f05e-4b6a-aea4-b4582ece4d0e/latest/result',
	matseEko: 'https://app.cloudscrape.com/api/runs/bebed754-49ca-4aad-be90-d33836e74280/latest/result',
	mathemEko: 'https://app.cloudscrape.com/api/runs/3f3181f7-d782-4f3c-8020-f8ef7bc805af/latest/result'
	

};


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
			case 'icaEko':
				return new BuildCloudscrapeRequest(storesURL.icaEko);
			case 'mathemEko':
				return new BuildCloudscrapeRequest(storesURL.mathemEko);
			case 'matseEko':
				return new BuildCloudscrapeRequest(storesURL.matseEko);
			case 'coopEko':
				return new BuildCloudscrapeRequest(storesURL.coopEko);	

		}
	}
};