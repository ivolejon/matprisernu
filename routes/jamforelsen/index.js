var express = require('express');
var app = module.exports = express();

app.get('/jamforelsen', function(req,res){
res.render('jamforelsen');
});