/**
 *  Hit the guardian api to get recent stories then persist in database
 *
 */

var sys = require('util');
var rest = require('restler');
// date support
//var moment = require('moment');

exports.importNews = function(callback) {

    // grab some data to store
    rest.get('http://content.guardianapis.com/search?section=commentisfree&format=json').on('complete', function(data) {

        if (data instanceof Error) {
            // todo review this usage of sys
//            sys.puts('Error: ' + data.message);
            console.log("Error returned " + data.message);

        } else {
//            sys.puts(data);
//            console.log("Received data first " + data.response.results.length + " of " + data.response.total);

            return callback(data.response.results);
        }
    });
};

