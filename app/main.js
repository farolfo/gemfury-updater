var gemfuryUpdater = require('./gemfury-updater.js'),
	packageJsonDAO = require('./packageJsonDAO.js'),
	schedule = require('node-schedule');
/*
var rule = new schedule.RecurrenceRule(),
	savedPackageJson;

rule.hour = 0;
rule.minute = 0;

var loop = function() {
	var packageJson = packageJsonDAO.getFile( function(){
		if ( fileHasChanged(packageJson) ) {
			gemfuryUpdater.run(packageJson);
		}
	});
};

var fileHasChanged = function(packageJson) {
	if ( ! savedPackageJson || packageJson !== savedPackageJson ) {
		savedPackageJson = packageJson;
		return true;
	}

	return false;
};

schedule.scheduleJob(rule, loop);

*/
packageJsonDAO.init();
var file = packageJsonDAO.getFile( function(file){
	gemfuryUpdater.run(file);	
});

