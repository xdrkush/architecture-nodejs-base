// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Article = require('../database/Article'),
    Comment = require('../database/Comment')

module.exports = {
    get: async(req, res) => {
        const dbArticle = await Article.find({})
        console.log(dbArticle);
        res.render('article', {
            dbArticle
        })
    },
    getID: async(req, res) => {
        const query = req.params.id,
              dbArticleID = await Article.findById(query),
              dbCommentID = await Comment.find({articleID: query})
              
        console.log(query);
        console.log(dbArticleID);
        console.log(dbCommentID);

        res.render('articleID', {
            artID: dbArticleID,
            comment: dbCommentID
        })
    },
    post: async(req, res) => {
        const dbArticle = await Article.find({})
        Article.create({
                ...req.body
            },
            res.redirect('/article')
        )
    },
    deleteOne: (req, res) => {
        Article.deleteOne({
                _id: req.params.id
            },
            (err) => {
                if (!err) {
                    res.redirect('/article')
                } else {
                    res.send(err)
                }
            })
    },
    deleteAll: (req, res) => {
        Article.deleteMany((err) => {
            if (!err) {
                res.redirect('/article')
            } else {
                res.send(err)
            }
        })
    }
}