/**
 *      Handle all the tasks required to import news
 */

var importer = require('../utils/importer.js');
var dao = require('../repository/dao.js');

exports.importNews = function() {

    // use the importer util to grab some news results
    importer.importNews(new function(results) {

        if (typeof results !== "undefined") {

            // iterate the results and store then in the database
            for(var i = 0; i < results.length ; i++) {
                var result = results[i];
                console.log("Story: " + result.id + " " + result.webPublicationDate + " " + result.webTitle
                    + " " + result.webUrl);

                // parse the pub date and produce a native js date
                var pubDate = moment(result.webPublicationDate).toDate();
                console.log("parsed date result: " + pubDate);

                dao.saveNews(result.id, pubDate, result.webTitle, result.webUrl);
            }
        }
    });

};