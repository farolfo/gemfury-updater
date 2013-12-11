var GitHubApi = require('github'),
	log4js = require('log4js'),
	config = require('config');

var github = new GitHubApi({version: '3.0.0'}),
	logger = log4js.getLogger();
//19ca18d5d321da83c2b7400d4f787af0986f6bf9  API TOKEN

if (config.github) {
    github.authenticate({
            type: 'basic',
            username: config.github.username,
            password: config.github.password
    });
    user = config.username;
    repo = config.repo;
    path = config.path ? config.path : 'package.json'
}

function parsePackageJson(body) {
        try {
            // JSON.parse will barf with a SyntaxError if the body is ill.
            return JSON.parse(body);
        } catch (error) {
            return null;
        }
}

github.repos.getContent({user: user, repo: repo, path: path}, function(err, resp) {
    if (err) {
            logger.error(err);
            return;
    }

    var packageJson = new Buffer(resp.content, resp.encoding).toString();
    var data = parsePackageJson(packageJson);

    if (!data) {
            callback(new Error('Failed to parse package.json: ' + packageJson));
            return;
    } else {
            console.log('Got manifest', data.name, data.version);
            return data;
    }
});
/*
exports.getFile = function() {
	return fs.readFileSync('/Users/farolfo/Projects/Mulesoft/ion-console/console-web-html/package.json');
};*/