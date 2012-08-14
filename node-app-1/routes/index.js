
/*
 * GET home page.
 */

exports.index = function(req, res){

    // placeholder area to try out running server side JS

    // add in orm
    var orm = require("orm");
    // add in restler
    var sys = require('util');
    var rest = require('restler');
    // date support
    var moment = require('moment');

    var db = orm.connect("mysql://root:spit69fire@localhost/node_news", function (success, db) {
        if (!success) {
            console.log("Could not connect to database!");
            return;
        }

        // you can now use db variable to define models

        var News = db.define("news", {
            "storyId"   : { "type": "string" },
            "pubDate"   : { "type": "date" },
            "title"     : { "type": "string"},
            "url"       : { "type": "string"}
        });

        // create the tables if they don't exist
        News.sync();

        // grab some data to store
        rest.get('http://content.guardianapis.com/search?section=commentisfree&format=json').on('complete', function(data) {

            if (data instanceof Error) {
                sys.puts('Error: ' + data.message);
                console.log("Error returned " + data.message);
            } else {
                sys.puts(data);
                console.log("Received data first " + data.response.results.length + " of " + data.response.total);

                var results = data.response.results;

                if (typeof results !== "undefined") {
                    // iterate the results and store then in the database
                    for(var i = 0; i < results.length ; i++) {
                        var result = results[i];
                        console.log("Story: " + result.id + " " + result.webPublicationDate + " " + result.webTitle
                            + " " + result.webUrl);

                        // parse the pub date and produce a native js date
                        var pubDate = moment(result.webPublicationDate).toDate();
                        console.log("parsed date result: " + pubDate);

                        // wack in the data
                        var story = new News({
                            "storyId" : result.id,
                            "pubDate" : pubDate,
                            "title"   : result.webTitle,
                            "url" : result.webUrl
                        });

                        story.save(function (err, itemCopy) {
                            if (!err) {
                                console.log("Saved! ID=" + itemCopy.id);
                            } else {
                                console.log("Something went wrong...");
                                console.dir(err);
                            }
                        });
                    }
                }
            }
        });
    });

  res.render('index', { title: 'Express' });
};