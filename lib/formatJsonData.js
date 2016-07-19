var _ = require('underscore');
var moment = require('moment');
var calculate = require('./calculate');
var scrapers = require('./scrapers').getAllScrapers();
var recal = require('./temp_recalculate');

var exports = module.exports = {};

exports.format = function(data) {
    var dataset = {};
    var storeNames = _.pluck(data, 'store');
    storeNames = _.uniq(storeNames);
    dataset.batch = data[0].batch;
    var _date = new Date(data[0].date);
    dataset.date = moment(_date).format('YYYY-MM-DD'); // plockar fram datum
    dataset.timestamp = data[0].timestamp; // plockar fram datum

    var temp = _.where(data, { // function för att ta produkter från pro-kasse för att får namn på produkt och nummer senare
        store: 'pro'
    });

    var uniqProducts = _.map(temp, function(obj) { // function som bara plockar ut namnet, number
        return _.pick(obj, 'product_name', 'number');
    });

    uniqProducts = _.each(uniqProducts, function(obj) {
        var number = obj.number;
        _.each(storeNames, function(store) {
            var temp = _.where(data, {
                number: number,
                store: store
            });
            try {
                obj[store + 'ProductName'] = temp[0].product_name;
                obj[store + 'Url'] = temp[0].url;

                if (calculate.isNumeric(parseFloat(temp[0].product_price))) {
                    var temp_price = recal.recalculate(number,store,temp[0].product_price)//kolla om omräkning krävs?
                    //obj[store + 'Price'] = parseFloat(temp[0].product_price);
                    obj[store + 'Price'] = temp_price;
                } else {
                    obj[store + 'Price'] = '-';
                }


            } catch (e) {
                console.log(e);
            }

        })
        return obj;
    });



    dataset.products = uniqProducts;
    dataset.totals = {};
    dataset.shipping = {};
    dataset.shipping.coop = 49.00;
    dataset.shipping.mathem = 29.00;
    dataset.shipping.matse = 0;
    dataset.shipping.ica = 99.00;
    dataset.shipping.pro = 0;
    dataset.cheapestStore = '';
    dataset.cheapest = 100000;

    _.each(storeNames, function(store) {
        dataset.totals['total'+store] = calculate.calculateTotal(dataset.products, store);
        var tempPrice = dataset.totals['total'+store] + dataset.shipping[store];
        if(tempPrice < dataset.cheapest && store !== 'pro'){
            dataset.cheapest = tempPrice;
            dataset.cheapestStore = store;
        }
        dataset.totals['total'+store+'Shipping'] = tempPrice;


    });

   


    return dataset;
};