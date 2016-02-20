var _ = require('underscore');
var exports = module.exports = {};

exports.calculateTotal = function(dataset, store) {
        var totals = {};
        var cumulative = 0;
        var temp = _.pluck(dataset, store+'Price');
        _.each(temp, function(price) {
            if (exports.isNumeric(price)) {
                cumulative += price;
            }
        });
        return cumulative;
    };

    exports.isNumeric = function(n) {
        return (typeof n == "number" && !isNaN(n));
    };

