var _ = require('underscore');
var exports = module.exports = {};

var recals = [
{
number:'7',
mathem:6,// ska räknas upp x6
matse:6
},
{
number:'12',
coop:3,
mathem:3
},
{
number:'16',
coop:2,
ica:0.8
},
{
number:'19',
ica:0.7
}
];

exports.recalculate = function(number,store,price){
     var obj = _.where(recals,{number:number});
     if( obj.length > 0){
        obj = obj[0];
        if(_.has(obj, store)){
        price = parseFloat(price) * parseFloat(obj[store]);
        console.log(price);
        }
     }
     return price;
};











