var md5 = require('md5');


var cloudscrapeRequestAuth = {
cloudScrapeAccId : '35c0d709-0618-4f49-95c0-0daee86a3be4',
cloudScrapeApiId : 'a552c20cf8e7c7566bd8c2b11',
md5Hash : md5(this.cloudScrapeAccId + this.cloudScrapeApiId)
};


var storesURL = {
	ica: 'https://app.cloudscrape.com/api/executions/0799e5f6-5401-46a4-938f-8326a1ec33c7/result',
	mathem: 'https://app.cloudscrape.com/api/executions/19d3bcfa-4558-43a3-8254-6deac99d6234/result',
	coop: 'https://app.cloudscrape.com/api/executions/4e8fa0a5-c376-4713-b641-181c38151dea/result',
	matse: 'https://app.cloudscrape.com/api/executions/adf39268-a068-4585-b97e-2a07f5af194f/result'
};



module.exports = {
	DBconnection: {
		host: 'ec2-54-204-0-120.compute-1.amazonaws.com',
		user: 'nddqzoptyfglob',
		password: 'gPGusVHnnhV_y4gSsEK3fTjmp7',
		database: 'd4gq9q6biaosm6',
		ssl: true
	}
};


var BuildCloudscrapeRequest = function(endpointURL) {
	return {
		url: endpointURL,
		headers: {
			'X-CloudScrape-Access': cloudscrapeRequestAuth.md5Hash,
			'X-CloudScrape-Account': cloudscrapeRequestAuth.cloudScrapeAccId,
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