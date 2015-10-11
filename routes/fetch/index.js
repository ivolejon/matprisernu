var express = require('express');
var app = module.exports = express();

app.get('/fetch', function(req,res){
res.end('fetch');
});