var md5 = require('md5');

    var cloudScrapeAccId = '35c0d709-0618-4f49-95c0-0daee86a3be4';
    var cloudScrapeApiId = 'a552c20cf8e7c7566bd8c2b11';
    var md5Hash = md5(cloudScrapeAccId + cloudScrapeApiId);

module.exports = {
     DBconnection:{
         host     : 'ec2-54-204-0-120.compute-1.amazonaws.com',
         user     : 'nddqzoptyfglob',
         password : 'gPGusVHnnhV_y4gSsEK3fTjmp7',
         database : 'd4gq9q6biaosm6',
         ssl: true
     }
};

module.exports = {
	BuildCloudscrapeRequest: function(endpointURL){
		return  {
        url: endpointURL,
        headers: {
            'X-CloudScrape-Access': md5Hash,
            'X-CloudScrape-Account': cloudScrapeAccId,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'request'
        }

    };
	}
};


