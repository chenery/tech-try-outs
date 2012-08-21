# tech-try-outs

Try out some Javascript based stuff, in particular server side in order to compare to Java.

news_velocity
=============

A simple server side driven web app that delivers the most talked about articles on news sites.

Implemented for Guardian comment articles.  Article scoring is based on comments per hour.

## Todo:
- Frontend to visualise data
- Test framework
- Dependency management and packaging
- Extend to scrape twitter/social media
- Integrate backbone.js

# Tech used

Web app framework: Express
==========================

http://expressjs.com/

To install globally:

	$ npm install express -g

	$ cd node-app-1
	$ express --sessions --css stylus

Note: Can try out using Bootstrap as per [https://github.com/shomeya/bootstrap-stylus](https://github.com/shomeya/bootstrap-stylus)

	$ npm install

	$ node app

Http client: Restler
====================

Add a module to make http client requests [https://github.com/danwrong/restler](https://github.com/danwrong/restler).

    $ npm install util
    $ npm install restler

    var sys = require('util'),
        rest = require('restler');

Debugger: node-inspector
========================

A node debugger [https://github.com/dannycoates/node-inspector](https://github.com/dannycoates/node-inspector).

    $ npm install -g node-inspector

To enable debug mode for the program:

    $ node --debug app.js

Start the inspector in the background.

    $ node-inspector &

Database: mysql
===============

Add in mysql client support [https://github.com/felixge/node-mysql](https://github.com/felixge/node-mysql)

    $ npm install mysql

ORM support: Sequelize
======================

I tried node-orm to persist data https://github.com/dresende/node-orm/.  But found it to be limited for mysql.

Install http://sequelizejs.com/

    $ npm install sequelize

Date Utils: Moment
==================

Add in a date lib to format dates to insertion into the database http://momentjs.com/.

    $ npm install moment

Dom manipulation for scraping: jsdom
====================================

Add a DOM implementation so we can search for comments using https://github.com/tmpvar/jsdom

    $ npm install jsdom

I had issues getting the dependency contextify installed https://github.com/tmpvar/jsdom/issues/436.  Ended up running the following based on https://github.com/mxcl/homebrew/issues/13337:

    $ sudo xcode-select -switch /usr/bin

Scheduler: node-cron
====================

Add a scheduler to make our job periodic, https://github.com/ncb000gt/node-cron

    $ npm install time
    $ npm install cron

Templating: Jade
================

https://github.com/visionmedia/jade


Notes & Reading
===============

JS closures:

http://stackoverflow.com/questions/111102/how-do-javascript-closures-work

Application structure:

http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application

http://stackoverflow.com/questions/10103338/how-to-exports-models-with-node-orm

Node style guide:

http://nodeguide.com/style.html

Thoughts on scraping:

http://phantomjs.org/

Using backbone on the server:

http://andyet.net/blog/2011/feb/15/re-using-backbonejs-models-on-the-server-with-node/

http://stackoverflow.com/questions/4296505/understanding-promises-in-node-js