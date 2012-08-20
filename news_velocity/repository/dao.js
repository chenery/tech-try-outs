/**
 *  Module to handle data access and persistence.
 */

var sequelize = require("sequelize");
var models = require('./models.js');
var moment = require('moment');

exports.saveNews = function(storyId, pubDate, title, url) {

    // todo check the db connection is initialised already

    // check to see if this story exists already
    models.Models.News.find({ where: {storyId: storyId} }).success(function(news) {
        // news will be the first entry of the news table with the storyId 'storyId' || null
        if (news !== null) {
            console.log("Story already exists, skipping import");
        } else {
            models.Models.News.create({ storyId: storyId, pubDate: pubDate, title: title, url: url})
                .success(function(news) {
                    // you can now access the newly created task via the variable news
                    console.log("news created");
                });
        }
    });
};

exports.getNews = function(callback) {
    models.Models.News.findAll(
        {order: "score DESC"}
    ).success(function(newses) {
            // newses will be an array of all News instances, pass back using callback func
            return callback(newses);
        });
};

exports.saveCommentRecord = function(storyId, numComments) {

    models.Models.News.find({ where: {storyId: storyId} }).success(function(news) {
        // news will be the first entry of the news table with the storyId 'storyId' || null
        if (news !== null) {

            // keep a record of the comments over time
            models.Models.CommentRecord.create({ date: new Date(), numComments: numComments})
                .success(function(commentRecord) {
                    // you can now access the newly created task via the variable news
                    news.addCommentRecord(commentRecord).success(function() {
                        console.log("added comment record association");
                        console.log("CommentRecord created");
                    });
                });

            // update the score on the News instance
            // This score will be calculated as the number of comments divided by the number of hours since the
            // publish date, i.e. comments per hour.
            var pubDateMoment = moment(news.pubDate);
            var age = moment().diff(pubDateMoment, 'hours', true);    // true for floating point calc
            var score = numComments / age;

            console.log("Score for story " + news.storyId + " is " + score);

            news.score = score;
            news.totalComments = numComments;
            news.save().success(function () {
                console.log("Added score to story")
            })

        } else {
            console.log("Cannot find story, skipping saveCommentRecord");
        }
    });
};

