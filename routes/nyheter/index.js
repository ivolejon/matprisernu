var express = require('express');
var app = module.exports = express();

app.get('/nyheter', function(req,res){
res.render('nyheter');
});