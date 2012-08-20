/**
 *      Handle all the tasks required to scrape and persist number of comments for existing news stories.
 */

var scraper = require('../utils/scraper.js');
var dao = require('../repository/dao.js');

exports.scrapeComments = function() {

    // get all the news for which to record comments scores
    dao.getNews(function(newses) {
        // newses will be an array of all News instances
        for(var i = 0; i < newses.length ; i++) {
            var news = newses[i];

            // get the number of comments for this story
            scraper.getNumberOfComments(news.url, function(numComments) {

                // record this number of comments for this time and calcualate the news score
                dao.saveCommentRecord(news.storyId, numComments);
            });
        }
    });
};