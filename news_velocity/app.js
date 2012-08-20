
/**
 * Module dependencies.
 *
 * todo check the app does not block the event loop
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , models = require('./repository/models.js')
    , importer = require('./jobs/news-importer.js')
    , scraper = require('./jobs/comments-scraper.js');

// initialise the db connection and orm
models.getDbConnectionAndInitModels();

// kick off news importer job for every 15 min,
var cronJob = require('cron').CronJob;
new cronJob('0 0/15 * * * *', function(){

    importer.importNews();

}, null, true, "Europe/London");

// kick off comments scraper job for every 10 min, at a 30 sec offset
new cronJob('30 0/10 * * * *', function(){

    scraper.scrapeComments();

}, null, true, "Europe/London");

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
