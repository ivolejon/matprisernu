var _ = require('underscore');
var exports = module.exports = {};

var recals = [
{
number:'7',
mathem:6,// ska räknas upp x6
matse:6,
ica:0.9,
hemkop:0.850
},
{
number:'12',
coop:3,
mathem:3,
ica:0.9
},
{
number:'13',
ica:1.35
},
{
number:'16',
coop:2,
ica:0.8
},
{
number:'19',
ica:0.667,
hemkop:0.667,
willys:0.667,

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











