// dom manipulation
var jsdom = require("jsdom");
var models = require('../models/models.js');

/**
 * todo remove the persist from this function
 *
 * @param storyId
 * @param url
 *
 */
exports.persistStoryComments = function(storyId, url) {

    jsdom.env(url, [
        'http://code.jquery.com/jquery-1.5.min.js'
    ],
        function(errors, window) {

            try {

                // check for a comments form
                var commentsForm = window.$("#sort-comments");

                if (commentsForm !== "undefined") {
                    // scrape the current comments value

                    var firstElementHtml = commentsForm.children(":first").html();
                    var numCommentsStr = firstElementHtml.substring(0, firstElementHtml.indexOf(" "));

                    // todo number check, add to utils package

                    var numComments = parseInt(numCommentsStr);

                    if (!isNaN(numComments) && isFinite(numComments)) {

                        console.log("Found number of comments: " + numComments);

                        models.saveCommentRecord(storyId, numComments);

                    } else {
                        console.log("Error finding numeric comments value, skipping");
                    }
                } else {
                    console.log("Unable to find comments form, skipping");
                }
            } catch (err) {
                console.log("Error scraping story comments value, skipping: " + err.message);
            }
        }
    );
};

