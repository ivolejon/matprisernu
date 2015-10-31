var format = require('string-template');
module.exports = {

    convertJsonToInsertSQL:function(dataPackage){
        var SQLstringTemplate = "INSERT INTO test ({0}) VALUES ({1});"
        var currentValues = "";
        var columns = "";
        var finalSQLinsertStatements = "";
        for (i = 0; i < dataPackage.headers.length; i++) {
            columns += dataPackage.headers[i];
            if(i < dataPackage.headers.length-1){columns+=","} // skippa sista kommat!
        }

        dataPackage.rows.forEach(function(value, index){
            currentValues = "";
            for (i = 0; i < value.length; i++) {
                if (dataPackage.headers[i] === 'url' || dataPackage.headers[i] === 'vara'){
                    currentValues += "'"+value[i]+"'";
                }
                else if(dataPackage.headers[i] === 'pris'){
                    currentValues += parseFloat(value[i]);
                }
                else{
                    currentValues += value[i];
                }

                if(i < value.length-1){currentValues+=","} // skippa sista kommat!
                //console.log(format(SQLstringTemplate,columns,currentValues))

            }
            finalSQLinsertStatements += format(SQLstringTemplate,columns,currentValues);

        })
        return finalSQLinsertStatements;
    }
}