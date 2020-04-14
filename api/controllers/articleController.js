// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Article = require('../database/Article')

const { check, validationResult } = require('express-validator');

module.exports = {
    get: async(req, res) => {
        const dbArticle = await Article.find({})
        console.log(dbArticle);
        res.render('article', {
            dbArticle
        })
    },
    post: async(req, res) => {
        const errors = validationResult(req);
        const dbArticle = await Article.find({})

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(422).render('article', { errors: errors.array() });
        }

        Article
            .create({
                ...req.body
            })
            .then(article => {
                res.render('article', {
                    article: article,
                    dbArticle: dbArticle
                })
            })
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