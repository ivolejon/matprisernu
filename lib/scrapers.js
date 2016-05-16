var _ = require('underscore');
var exports = module.exports = {};

var scrapers = [{
        name: 'coop',
        url: 'http://www.coop.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/7a566040-aa85-4cb3-b04c-8b71a6024c90/latest/result',
        tags: 'kasse'
    }, {
        name: 'mathem',
        url: 'http://www.mathem.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/3ad81f5d-98fe-427d-a7e9-aa877394756f/latest/result',
        tags: 'kasse'
    }, {
        name: 'matse',
        url: 'http://www.mat.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/f6639fb9-b336-40ac-889d-a8dc00d73e44/latest/result',
        tags: 'kasse'
    }, {
        name: 'ica',
        url: 'http://www.ica.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/e55c911d-82a8-4904-bf8d-235290f90a58/latest/result',
        tags: 'kasse'
    }, {
        name: 'coopEko',
        url: 'http://www.coop.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/468b1484-f05e-4b6a-aea4-b4582ece4d0e/latest/result',
        tags: 'eko'
    },{
        name: 'mathemEko',
        url: 'http://www.mathem.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/3f3181f7-d782-4f3c-8020-f8ef7bc805af/latest/result',
        tags: 'eko'
    },{
        name: 'matseEko',
        url: 'http://www.mat.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/bebed754-49ca-4aad-be90-d33836e74280/latest/result',
        tags: 'eko'
    },{
        name: 'icaEko',
        url: 'http://www.mat.se',
        cloudScrapeUrl: 'https://api.dexi.io/runs/4fe8784d-6498-420d-8178-b3af6cf49d62/latest/result',
        tags: 'eko'
    }

];

exports.getScraper = function(storeName){
     var storeObject = _.where(scrapers, {
            name: storeName
        });
     return storeObject[0];
};

exports.getAllScrapers = function(){
     return scrapers;
};










