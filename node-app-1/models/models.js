// todo work out how to structure and modularise the app

var orm = require("orm");

exports.getDbConnectionAndInitModels = function() {
    return orm.connect("mysql://root:spit69fire@localhost/node_news", function (success, db) {
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

        console.log("Connected to db and models initialised.");
    });
};

exports.saveNews = function(storyId, pubDate, title, url) {
    // wack in the data
    var story = new orm.News({
        "storyId" : storyId,
        "pubDate" : pubDate,
        "title"   : title,
        "url" : url
    });

    story.save(function (err, itemCopy) {
        if (!err) {
            console.log("Saved! ID=" + itemCopy.id);
        } else {
            console.log("Something went wrong...");
            console.dir(err);
        }
    });
};

