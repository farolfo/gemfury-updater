var packageJsonDAO = require('./packageJsonDAO'),
	fs = require('fs'),
	Q = require('q'),
	fsExtra = require('fs.extra'),
	npm = require('npm'),
	log4js = require('log4js'),
	exec = require('child_process').exec;

var logger = log4js.getLogger();

exports.run = function(file) {
	createTmpFolder();	

	fs.writeFileSync('./temp/modules/package.json', file);

	npm.load({prefix: './temp/modules'}, function (er) {
		logger.info("NPM initializated. Downloading node modules...");
		npm.commands.install(["grunt-cli"], function(er, data) {
			logger.info("Downladed grunt-cli");
			npm.commands.install([], function (er, data) {
    			if (er) return logger.error(er);
    			logger.info("Node modules download success");
    			updateRepo();
    			//deleteTmpFolder();
  			});	
		});
	});
};

var deleteTmpFolder  =function() {
	if ( fs.existsSync('./temp') ) {
		fsExtra.rmrfSync('./temp');
	}
};

var createTmpFolder = function() {
	deleteTmpFolder();

	fs.mkdirSync('./temp');
	fs.mkdirSync('./temp/packedModules');
	fs.mkdirSync('./temp/modules');
	logger.info("./temp directory created empty (packedModules and modules folders inside)");
};

var updateRepo = function() {
	packModules();
	postModulesToRepo();
};

var packModules = function() {
	var modules = fs.readdirSync('./temp/modules/node_modules');

	modules.forEach(function(module) {
   		if ( module !== '.bin' ) {
    		packModule(module);
   		}
   	});
};

var packModule = function(module) {
	logger.info("Packing module " + module);

	exec('cd ./temp/packedModules && npm pack ' + module, function (error, stdout, stderr) {
		logger.info("Module " + module + " packed in " + stdout );
	});
};

var postModulesToRepo = function() {

};