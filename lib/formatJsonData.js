var _ = require('underscore');
var moment = require('moment');
var calculate = require('./calculate');
var exports = module.exports = {};

exports.format = function(data) {
    
    dataset = {};

    dataset.batch = data[0].batch;
    var _date = new Date(data[0].date);
    dataset.date = moment(_date).format('YYYY-MM-DD'); // plockar fram datum

    var temp = _.where(data, { // function för att ta produkter från pro-kasse för att får namn på produkt och nummer senare
        store: 'pro'
    });

    var uniqProducts = _.map(temp, function(obj) { // function som bara plockar ut namnet, number
        return _.pick(obj, 'product_name', 'number');
    });

    uniqProducts = _.each(uniqProducts, function(obj) {
        var number = obj.number;

        var temp = _.where(data, {
            number: number,
            store: 'coop'
        });
        if (calculate.isNumeric(parseFloat(temp[0].formated_product_price))) {
            obj.price_coop = parseFloat(temp[0].formated_product_price);
        } else {
            obj.price_coop = '-';
        }
        var temp = _.where(data, {
            number: number,
            store: 'mathem'
        });
        if (calculate.isNumeric(parseFloat(temp[0].formated_product_price))) {
            obj.price_mathem = parseFloat(temp[0].formated_product_price);
        } else {
            obj.price_mathem = '-'
        }

        var temp = _.where(data, {
            number: number,
            store: 'matse'
        });
        if (calculate.isNumeric(parseFloat(temp[0].formated_product_price))) {
            obj.price_matse = parseFloat(temp[0].formated_product_price);
        } else {
            obj.price_matse = '-'
        }

        var temp = _.where(data, {
            number: number,
            store: 'ica'
        });
        if (calculate.isNumeric(parseFloat(temp[0].formated_product_price))) {
            obj.price_ica = parseFloat(temp[0].formated_product_price);
        } else {
            obj.price_ica = '-'
        }

        var temp = _.where(data, {
            number: number,
            store: 'pro'
        });
        if (calculate.isNumeric(parseFloat(temp[0].formated_product_price))) {
            obj.price_pro = parseFloat(temp[0].formated_product_price);
        } else {
            obj.price_pro = '-'
        }

        return obj;
    });

    dataset.products = uniqProducts;
    dataset.totals = {};
    dataset.shipping = {};

    dataset.totals.totalCoop = calculate.calculateTotal(dataset.products, 'coop');
    dataset.totals.totalMathem = calculate.calculateTotal(dataset.products, 'mathem');
    dataset.totals.totalMatse = calculate.calculateTotal(dataset.products, 'matse');
    dataset.totals.totalIca = calculate.calculateTotal(dataset.products, 'ica');
    dataset.totals.totalPro = calculate.calculateTotal(dataset.products, 'pro');

    dataset.shipping.coop = 49.00;
    dataset.shipping.mathem = 29.00;
    dataset.shipping.matse = 0;
    dataset.shipping.ica = 99.00;
    dataset.shipping.pro = 0;

    dataset.totals.totalCoopShipping = dataset.totals.totalCoop + dataset.shipping.coop;
    dataset.totals.totalMathemShipping = dataset.totals.totalMathem + dataset.shipping.mathem;
    dataset.totals.totalMatseShipping = dataset.totals.totalMatse + dataset.shipping.matse;
    dataset.totals.totalIcaShipping = dataset.totals.totalIca + dataset.shipping.ica;
    dataset.totals.totalProShipping = dataset.totals.totalPro + dataset.shipping.pro;

    return dataset;
};