var express = require('express');
var app = module.exports = express();
var DB = require('./DB');



module.exports = {
    createErrorReport: function(batch,callback) {
        var DBconnection = DB.dbConnection();
        sql = "SELECT * FROM produkt_v1 WHERE batch = '" + batch + "' AND LENGTH (error) > 0;"
        DBconnection.raw(sql)
            .then(function(resp) {
                var data = resp.rows;
                var dataset = {};
                DBconnection.destroy();
                
                callback(data);
            })
    }
};