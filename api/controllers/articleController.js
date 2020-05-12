// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Article = require('../database/Article')

module.exports = {
    get: async(req, res) => {
        const dbArticle = await Article.find({})
        // console.log(dbArticle);
        res.render('article', {
            dbArticle: dbArticle
        })
    },
    post: async(req, res) => {
        const dbArticle = await Article.find({})
        Article.create({
                ...req.body
        })
        res.render('article', {
            dbArticle: dbArticle
        })
    },
    put: async (req, res) => {
        // Probleme suppression (plusieur image Conflit )
        const dbArticle = await Article.findById(req.params.id),
              query = {_id: req.params.id}
          pathImg = path.resolve("public/images/" + dbArticle.name)
    
        console.log(req.file)
    
        Article.updateOne( query, {
            title: req.body.title
          },
          (err) => {
            if (err) res.redirect('/')
            else {
                res.render('article', {
                    dbArticle: dbArticle
                })
            }
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