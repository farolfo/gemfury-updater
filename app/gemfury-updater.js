var packageJsonDAO = require('./packageJsonDAO'),
	config = require('../config.json'),
	fs = require('fs'),
	Q = require('q'),
	fsExtra = require('fs.extra'),
	npm = require('npm'),
	Sync = require('sync');
	log4js = require('log4js'),
	restler = require('restler'),
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
	setTimeout((function() {
		postModulesToRepo();
	}), 20000);
};

var packModules = function() {
	var modules = fs.readdirSync('./temp/modules/node_modules');
logger.info("-------a1-------");
	modules.forEach(function(module) {
   		if ( module !== '.bin' ) {
   			logger.info("-------b1-------");
    		packModule(module);
    		logger.info("-------b2-------");

   		}
   	});
   	logger.info("-------a2-------");

};



var packModule = function(module) {
	logger.info("-------c1-------");
	Sync(function(){
			logger.info("-------d1-------");

		logger.info("Packing module " + module);
		exec.sync(null, 'cd ./temp/packedModules && npm pack ' + module);
	}, function(err, out, code){
			logger.info("-------d2-------");

		if ( err ) {
			logger.error("Failed to pack module " + module + " - " + err);
		} else {
    		logger.info("Module " + module + " packed in " + out);
		}
	});
	logger.info("-------c2-------");
};

var postModulesToRepo = function() {
	var modules = fs.readdirSync('./temp/packedModules');

	modules.forEach(function(module) {
		postModuleToRepo(module);
	});
};

var postModuleToRepo = function(module) {
	var filename = './temp/packedModules/' + module,
		stats = fs.statSync(filename);

	logger.info("Updating module " + module + " in gemfury...");

    restler.post( config.gemfuryUploadURL, {
        multipart: true,
        data: {
            "package": restler.file(filename, null, stats.size, null, "application/x-compressed")
        }
    }).on("complete", function(data) {
        logger.info("Module " + module + " updated in gemfury");
    }).on("fail", function(data){
    	logger.error("Failed updating " + module + " " + data);
    });
};