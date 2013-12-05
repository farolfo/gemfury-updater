var fs = require('fs');

exports.getFile = function() {
	return fs.readFileSync('../package.json');
};