var express = require('express');
var app = module.exports = express();

app.get('/about', function(req,res){
res.render('about');
});