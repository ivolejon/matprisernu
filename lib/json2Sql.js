var format = require('string-template');
var UTF8 = require('utf8');


var convertType = {
    url: function(value) {
        if (value) {
            return '\'' + value + '\'';
        }
    },
    number: function(value) {
        return parseFloat(value);
    },

    product_name: function(value) {
        if (value) {
            return '\'' + value + '\'';
        }
        else{
            return '\'\'';
        }
    },
    product_price: function(value) {
        if (value) {
            if (value.match(" /st"+"$") || value.match(" /kg"+"$") ){// willys fix
                value = value.replace(' /st', '')
                value = value.replace(' /kg', '')
                value = value.replace(' ', '.')
            }
            value = value.replace('<sup>',',');
            value = value.replace(/[^0-9,.:]/g, '');
            value = value.replace(',', '.');
            value = value.replace(':', '.');
            value = parseFloat(value);

        }
        return value;
    },
    error: function(value) {
        if (value) {
            return '\''+value+'\'';
        }
        else{
            return '\'\'';
        }
    }

}

module.exports = {

    convertJsonToInsertSQL: function(dataPackage, store, batch, timestamp, tags) {
        var SQLstringTemplate = 'INSERT INTO products ({0},store,batch,timestamp,tags) VALUES ({1},\''+store+'\',\''+batch+'\',\''+timestamp+'\',\''+tags+'\');';
        var currentValues = "";
        var columns = "";
        var currentRow = ""
        var finalSQLinsertStatements = "";
        for (i = 0; i < dataPackage.headers.length; i++) {
            columns += dataPackage.headers[i];
            if (i < dataPackage.headers.length - 1) {
                columns += ",";
            } // skippa sista kommat!
        }

        dataPackage.rows.forEach(function(value, index) {
            currentValues = '';
            for (var i = 0; i < value.length; i++) {
                currentRow = dataPackage.headers[i];
                currentValues += convertType[currentRow](value[i]);


                if (i < value.length - 1) {
                    currentValues += ',';
                } // skippa sista kommat!
                //console.log(format(SQLstringTemplate,columns,currentValues))

            }

            finalSQLinsertStatements += format(SQLstringTemplate, columns, currentValues);

        });
        //return UTF8.encode(finalSQLinsertStatements);
        return finalSQLinsertStatements;
    }
}