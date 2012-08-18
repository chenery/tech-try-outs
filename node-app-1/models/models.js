// module for persistance

var Sequelize = require("sequelize");

// Holder object for all our models
var Models = {};

exports.getDbConnectionAndInitModels = function() {
    var sequelize = new Sequelize('node_news', 'root', 'spit69fire', {
        host: "localhost",
        port: 3306
    });

    // define our entities

    Models.News = sequelize.define('news', {
        storyId:    Sequelize.STRING,
        pubDate:    Sequelize.DATE,
        title:      Sequelize.STRING,
        url:        Sequelize.STRING
    });

    var CommentRecord = sequelize.define('comment_record', {
        date:           Sequelize.DATE,
        numComments:    Sequelize.INTEGER
    });

    // define our associations

    /**
     * This will add the attribute NewsId or news_id to CommentRecord.
     * Instances of News will get the accessors getCommentRecords and setCommentRecords.
     */

    Models.News.hasMany(CommentRecord, {as: "CommentRecords"});

    // create all tables... now!
    sequelize.sync();
};

exports.saveNews = function(storyId, pubDate, title, url) {

    // todo check the db connection is initialised already

    // todo check to see if this story exists already

    Models.News.create({ storyId: storyId, pubDate: pubDate, title: title, url: url})
        .success(function(news) {
            // you can now access the newly created task via the variable news
            console.log("news created")
        });
};

