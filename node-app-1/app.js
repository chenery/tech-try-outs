
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , models = require('./models/models.js')
    , importer = require('./utils/importer.js');

// initialise the db connection and orm
models.getDbConnectionAndInitModels();

// kick off news importer job for every 1 min,
var cronJob = require('cron').CronJob;
new cronJob('0 * * * * *', function(){

    importer.importNews();

}, null, true, "Europe/London");

// todo kick off the comments scraper for existing news stories every 1 min

// todo kick off the score totaliser job every 1 min


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
