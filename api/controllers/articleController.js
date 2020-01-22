// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Article = require('../database/Article')

module.exports = {
    get: async(req, res) => {
        const dbArticle = await Article.find({})
        console.log(dbArticle);
        res.render('article', {
            dbArticle
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