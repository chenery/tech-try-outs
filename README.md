tech-try-outs
=============

Try out some Javascript based stuff

/node-app-1

Try out an express app.  To install globally:

	$ npm install express -g

	$ cd node-app-1
	$ express --sessions --css stylus

Note: Can try out using Bootstrap as per [https://github.com/shomeya/bootstrap-stylus](https://github.com/shomeya/bootstrap-stylus)

	$ npm install

	$ node app

Add a module to make http client requests [https://github.com/danwrong/restler].

    $ npm install util
    $ npm install restler

    var sys = require('util'),
        rest = require('restler');

A node debugger [https://github.com/dannycoates/node-inspector].

    $ npm install -g node-inspector

To enable debug mode for the program:

    $ node --debug app.js

Start the inspector in the background.

    $ node-inspector &
