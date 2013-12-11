var GitHubApi = require('github'),
	log4js = require('log4js'),
	config = require('../config.json');

var github = new GitHubApi({version: '3.0.0'}),
	logger = log4js.getLogger(),
	user, repo, path;

function authenticateGitHub() {
	if (config.github) {
	    github.authenticate({
	        type: "oauth",
    		token: config.github.token
	    });
	    user = config.github.username;
	    repo = config.github.repo;
	    path = config.github.path ? config.github.path : 'package.json'
	}
	logger.info("Github authentication succeed with\nuser: "+user+"\nrepo: "+repo+"\npath: " + path);
}

function parsePackageJson(body) {
        try {
            // JSON.parse will barf with a SyntaxError if the body is ill.
            return JSON.parse(body);
        } catch (error) {
            return null;
        }
}

exports.init = function() {
	authenticateGitHub();
};

exports.getFile = function(callback) {
	github.repos.getContent({user: user, repo: repo, path: path}, function(err, resp) {
	    if (err) {
	        logger.error("Failed to get package.json - " + err);
	        return;
	    }

	    var packageJson = new Buffer(resp.content, resp.encoding).toString();
	    var data = parsePackageJson(packageJson);

	    if (!data) {
	            logger.error("The package.json given is corrupted or has syntax errors - \n" + packageJson);
	    } else {
	        	logger.info("Package.json succesfully retrived");
	            callback(packageJson);
	    }
	    return;
	});
};