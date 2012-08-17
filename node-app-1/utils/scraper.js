// dom manipulation
var jsdom = require("jsdom");
var models = require('../models/models.js');

exports.persistStoryComments = function(storyId, pubDate, title, url) {

    return jsdom.env(url, [
        'http://code.jquery.com/jquery-1.5.min.js'
    ],
        function(errors, window) {

            // check for a comments form
            // todo work out why this jquery reference is now broken
            var commentsForm = $("#sort-comments");

            if (commentsForm !== "undefined") {
                // scrape the current comments value
                try {
                    var numCommentsStr = commentsForm.children(":first").html().substring(0, commentsForm.indexOf(" "));

                    // todo number check, add to utils package

                    var numComments = parseInt(numCommentsStr);

                    if (!isNaN(numComments) && isFinite(numComments)) {

                        console.log("Found number of comments: " + numComments);

                        models.saveNews(storyId, pubDate, title, url);

                    } else {
                        console.log("Error finding numeric comments value, skipping");
                    }
                } catch (err) {
                    console.log("Error scraping story comments value, skipping: " + err.message);
                }
            } else {
                console.log("Unable to find comments form, skipping");
            }
        }
    );
};

