var format = require('string-template');
module.exports = {
	Json2SqlInsert:function (json) {
		var SQLstringTemplate = "INSERT INTO test ({0}) VALUES ({1});";
		 console.log(json.length);
		  for (i = 0; i < json.length; i++) {
           
        }
	}
}