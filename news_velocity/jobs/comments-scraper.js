/**
 *      Handle all the tasks required to scrape and persist number of comments for existing news stories.
 */

var scraper = require('../utils/scraper.js');
var dao = require('../repository/dao.js');

exports.scrapeComments = function() {

    console.log("Starting scraper job");

    // get all the news for which to record comments scores
    dao.getNews(function(newses) {
        // newses will be an array of all News instances
        for(var i = 0; i < newses.length ; i++) {
            var news = newses[i];

            getCommentsAndSave(news.storyId, news.url);
        }
    });
};

var getCommentsAndSave = function(storyId, url) {
    // get the number of comments for this story
    scraper.getNumberOfComments(url, function(numComments) {

        // record this number of comments for this time and calculate the news score
        dao.saveCommentRecord(storyId, numComments);
    });
};