gemfury-updater
===============

What if a project needs a remote server to build? Think on maven, node, ruby... this alwas happens. How many times your builds stopped cause that remote server was not working at all?

Well, one solution you can peack is to use a new remote server with that dependecies cahced in [Gemfury](http://www.gemfury.com/). So we do some code and will ping to this new server if the one we use is not working.
But we still have a problem: **you have to keep that server updated when you update some dependecy** to a newer version in your project.

So here comes the *gemfury-updater*, an application that will poll every so often to your project and will have the same dependecies in this new remote server.

In english words, we will ping your [github](http://www.github.com) repo and check in the `package.json` (the first version has NPM modules for 'node' support only) if there is any change. If so, it will update your Gemfury with this new updates.

**So you basically will have to do nothin' in order to be sure that your builds will work** (at least on the dependecies download part).


###Project overview

Very very simple...

![alt text](/resources/flowPng.png "Graph not found :( ...")

###Other cool tools for NPM management

 *  [David](https://david-dm.org/) keeps track on my package.json file and tells me what dependencies are out of date and what is the new version with its changelog.
