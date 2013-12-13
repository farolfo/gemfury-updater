gemfury-updater
===============

What if a project needs a remote server to build? Think on maven, node, ruby... this alwas happens. How many times your builds stopped cause that remote server was not working?

Well, one solution you can peack is to use a remote server with that dependecies saved in [Gemfury](http://www.gemfury.com/). So we write some code and will ping to this new server if the one we use is not working.
Everything seems to be great, but we still have a problem: **you have to keep that server updated when you update some dependecy** to a newer version in your project.

So here comes the *gemfury-updater*, an application that will ping every so often to your project and will update it to have the same dependecies in this new remote server.

In english words, we will ping your [GitHub](http://www.github.com) repo and check in the `package.json` (the first version has NPM modules for `node` support only) if there is any change. If so, it will update your Gemfury server with this new updates.

**So you basically will have to do nothin' in order to be sure that your builds will work** (at least on the dependecies download part).

####Run

First of all you need to configure the application by touching the `config.json` file in the root directory.
It shoud look like this:

```
{
        "gemfuryUploadURL": "https://push.fury.io/45ge4dttgfe45gt5ger/farolfo/",
        "github": {
                "token": "9e8hrg9e8hgf9e8rjf9wrfvrw9fvejw9fwe9jvwe98fvs",
                "username": "farolfo",
                "repo": "gemfury-updater" 
        }
}
```

That is an example if I'd wanted to keep track on the `package.json` file of this project.

The parameters are:

* `gemfuryUploadURL`: The URL to push to your gemfury repo. You can know it by taking a look at the __upload__ section of your gemfury account.
* `github`: Here we will set the configuration for the repo you want to track
    * `token`: OAuth token of your GitHub account, so you can access to your repository. If you don't have a token, you can generate it by going to the __settings__ view of your GitHub account, __applications__ tab, and click on _create new token_ on the __Personal Access Tokens__ section.
    * `username`: The username where you have your repo hosted.
    * `repo`: The name of your project's repository.

After that you should be able to use your gemfury-updater.
This is a basic node application, so you only need to run in the root directory

```bash
$ npm   install
$ node ./app/main
```

####Project overview

Very very simple...

![alt text](/resources/flowPng.png "Graph not found :( ...")

####In case you have troubles...

The tricky part of this project is [installing](https://npmjs.org/doc/install.html) npm modules and then [packing](https://npmjs.org/doc/cli/npm-pack.html) them.

To do this, make sure you run the application with enough permissions needed.

Besides, some npm modules need some shell commands like `make` or some others. To make sure you have what is needed, just run `npm pack` in each folder of each package you want to update and make sure that a <name>.tgz file is generated there.
    
If you have any other trouble, contact me at francoarolfo@hotmail.com (yes, I still use hotmail) and we will figure it out !

####Other cool tools for NPM management

 *  [David](https://david-dm.org/) keeps track on my package.json file and tells me what dependencies are out of date and what is the new version with its changelog.
