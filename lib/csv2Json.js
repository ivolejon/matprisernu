var Converter = require('csvtojson').Converter;
var converter = new Converter({});

module.exports = {
	returnJson: function(stringCsv, callback){
		converter.fromString(stringCsv, function(err, result) {
		callback(result);
	
});
	}
};
