/**
 *  Hit the guardian api to get recent stories then persist in database
 *
 */

var sys = require('util');
var rest = require('restler');
// date support
var moment = require('moment');
var models = require('../models/models.js');

exports.importNews = function() {

    console.log("Starting new import");

    // grab some data to store
    rest.get('http://content.guardianapis.com/search?section=commentisfree&format=json').on('complete', function(data) {

        if (data instanceof Error) {
            // todo review this usage of sys
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

                    models.saveNews(result.id, pubDate, result.webTitle, result.webUrl);
                }
            }
        }
    });
};

