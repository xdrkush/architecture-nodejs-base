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
        if (req.body.title) {
            Article.create({
                ...req.body
            })
            req.flash('success', 'Merci d avoir entrer un titre')
            res.render('article', {
                success: req.flash('success'),
                dbArticle: dbArticle
            })

        } else {
            req.flash('errors', 'Vous devez saisir un titre')
            res.render('article', {
                errors: req.flash('errors'),
                dbArticle: dbArticle
            })
        }
    },
    deleteOne: async(req, res) => {
        const dbArticle = await Article.find({})
        if (req.params.id) {
            Article.deleteOne({
                _id: req.params.id
            },
            (err) => {
                if (!err) {
                    req.flash('success', 'Suppression confirmer !')
                    res.render('article', {
                        success: req.flash('success'),
                        dbArticle: dbArticle
                    })
                } else {
                    res.send(err)
                }
            })
        } else req.flash('errors', 'Une erreur c est produit !'), res.render('article', {errors: req.flash('errors')})
    },
    deleteAll: async(req, res) => {
        const dbArticle = await Article.find({})
        Article.deleteMany((err) => {
            if (!err) {
                req.flash('success', 'Tous les articles ont été supprimer !')
                res.render('article', {
                    success: req.flash('success'),
                    dbArticle: dbArticle
                })
            } else {
                res.send(err)
            }
        })
    }
}