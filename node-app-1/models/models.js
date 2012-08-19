// module for persistance

var Sequelize = require("sequelize");
var scraper = require("../utils/scraper.js");
var moment = require('moment');

// Holder object for all our models
var Models = {};

exports.getDbConnectionAndInitModels = function() {
    var sequelize = new Sequelize('node_news', 'root', 'spit69fire', {
        host: "localhost",
        port: 3306
    });

    // define our entities

    Models.News = sequelize.define('news', {
        storyId:        Sequelize.STRING,
        pubDate:        Sequelize.DATE,
        title:          Sequelize.STRING,
        url:            Sequelize.STRING,
        score:          Sequelize.FLOAT,
        totalComments:  Sequelize.INTEGER
    });

    Models.CommentRecord = sequelize.define('comment_record', {
        date:           Sequelize.DATE,
        numComments:    Sequelize.INTEGER
    });

    // define our associations

    /**
     * This will add the attribute NewsId or news_id to CommentRecord.
     * Instances of News will get the accessors getCommentRecords and setCommentRecords.
     */

    Models.News.hasMany(Models.CommentRecord, {as: "CommentRecord"});

    // create all tables... now!
    sequelize.sync();
};

exports.saveNews = function(storyId, pubDate, title, url) {

    // todo check the db connection is initialised already

    // check to see if this story exists already
    Models.News.find({ where: {storyId: storyId} }).success(function(news) {
        // news will be the first entry of the news table with the storyId 'storyId' || null
        if (news !== null) {
            console.log("Story already exists, skipping import");
        } else {
            Models.News.create({ storyId: storyId, pubDate: pubDate, title: title, url: url})
                .success(function(news) {
                    // you can now access the newly created task via the variable news
                    console.log("news created");
                });
        }
    });
};

exports.getNewsAndScrape = function() {
    // find multiple entries
    Models.News.findAll().success(function(newses) {
        // newses will be an array of all News instances
        for(var i = 0; i < newses.length ; i++) {
            var news = newses[i];
            scraper.persistStoryComments(news.storyId, news.url);
        }
    })
};

exports.saveCommentRecord = function(storyId, numComments) {

    Models.News.find({ where: {storyId: storyId} }).success(function(news) {
        // news will be the first entry of the news table with the storyId 'storyId' || null
        if (news !== null) {

            // keep a record of the comments over time
            Models.CommentRecord.create({ date: new Date(), numComments: numComments})
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

