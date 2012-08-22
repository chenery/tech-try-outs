/**
 *  Module for definition of persistent models.
 *
 *  Also creates tables for each model and creates a database connection
 */

var sequelize = require("sequelize");

// Holder object for all our models
var Models = {};

exports.Models = Models;

exports.getDbConnectionAndInitModels = function() {
    var db = new sequelize('node_news', 'root', 'spit69fire', {
        host: "localhost",
        port: 3306,
        logging: false
    });

    // define our entities

    Models.News = db.define('news', {
        storyId:        sequelize.STRING,
        pubDate:        sequelize.DATE,
        title:          sequelize.STRING,
        url:            sequelize.STRING,
        score:          sequelize.FLOAT,
        totalComments:  sequelize.INTEGER
    });

    Models.CommentRecord = db.define('comment_record', {
        date:           sequelize.DATE,
        numComments:    sequelize.INTEGER
    });

    // define our associations

    /**
     * This will add the attribute NewsId or news_id to CommentRecord.
     * Instances of News will get the accessors getCommentRecords and setCommentRecords.
     */

    Models.News.hasMany(Models.CommentRecord, {as: "CommentRecord"});

    // create all tables... now!
    db.sync();

    console.log("db connected and models initialised.")
};