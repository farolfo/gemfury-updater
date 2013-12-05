var fs = require('fs');

exports.getFile = function() {
	return fs.readFileSync('/Users/farolfo/Projects/Mulesoft/ion-console/console-web-html/package.json');
};