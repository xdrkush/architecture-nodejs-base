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
            res.render('article', {
                dbArticle
            })
        )
    }
}