
/*
 * Import Module
 ****************/ 
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Article = require('../database/Article')

/*
 * Controller
 *************/ 
module.exports = {
    // Method Get
    get: async(req, res) => {
        const dbArticle = await Article.find({})
        console.log(dbArticle);
        res.render('article', {
            dbArticle
        })
    },
    // Method Post
    post: async(req, res) => {
        const dbArticle = await Article.find({})
        Article.create({
                ...req.body
            },
            res.redirect('/article')
        )
    },
    // Method Delete One
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
    // Method Delete All
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