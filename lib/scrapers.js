var _ = require('underscore');
var exports = module.exports = {};

var scrapers = [ 
    {
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
    },
    {
        name: 'willys',
        url: 'https://handla.willys.se/',
        cloudScrapeUrl: 'https://api.dexi.io/runs/f3b9c031-39fc-4342-87d3-d0c3685c2b28/latest/result',
        tags: 'kasse'
    },
     {
        name: 'hemkop',
        url: 'https://www.hemkop.se/',
        cloudScrapeUrl: 'https://api.dexi.io/runs/9c7c0379-62cb-4819-b514-763db9c4ae96/latest/result',
        tags: 'kasse'
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










