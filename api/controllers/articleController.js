/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    path = require('path')
const Article = require('../database/Article'),
      Comment = require('../database/Comment')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const dbArticle = await Article.find({})
        // Petit log pour checker
        console.log(dbArticle);
        // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
        res.render('article', {
            dbArticle
        })
    },
    // Method Post
    post: async (req, res) => {
        // Variable de récupération de tout les Articles
        const dbArticle = await Article.find({})

        // Condition pour checker notre title
        if (req.body.title) {

            // On demande au model Article de créé un Article
            Article.create({
                // Il nous créé un Article avec le model du formulaire envoyer (req.body)
                ...req.body
            })
            // On définit un req.flash success avec sont contenu
            req.flash('success', 'Merci d avoir entrer un titre')
            // Et on redirige sur la page /article pour que notre nouvelle article soit charger au montage de la page
            res.render('article', {
                // Ici on renvoie notre réponse
                success: req.flash('success'),
                dbArticle: dbArticle
            })
            // Sinon pas de title alors
        } else {
            // On définit un req.flash error avec sont contenu
            req.flash('errors', 'Vous devez saisir un titre')
            // Et on redirige sur la page /article pour que notre nouvelle article soit charger au montage de la page
            res.render('article', {
                // Ici on renvoie notre réponse
                errors: req.flash('errors'),
                dbArticle: dbArticle
            })

        }

    },
    // Method Delete One
    deleteOne: async (req, res) => {
        // Ici une constante pour récupéré les commentaire lié a notre Article
        const refComment = await Comment.find({
            articleID: req.params.id
        })
        // Log pour checker
        // console.log(refComment)
        if (req.params.id) {
            // Fonction de suppression de un Articles rechercher par son _id
            Article.deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id
                // ici nous avons un callback err
            }, (err) => {
                // Si nous avons pas d'erreur alors on Continu
                if (!err) {
                    // Ici on check si des commentaire sont lié à notre Article
                    if (refComment) {
                        // Ici les commentaire lié à notre ID de notre Article seront supprimer
                        Comment.deleteOne({
                            // On demande à récupéré tout nos Comment ayant comme articleID req.params.id (l'ID de l'article référant)
                            articleID: req.params.id
                            // Petit Callback en cas d'err
                        }, (err) => {
                            // Petit log de check
                            console.log('Les Commentaire on été supprimer');
                            // Si il n'y a pas d'err alors on redirige sur la page article
                            if (!err) {
                                req.flash('success', 'Suppression confirmer !')
                                res.render('article', {
                                    success: req.flash('success'),
                                    dbArticle: dbArticle
                                })
                            }
                            // Sinon on renvoie l'err
                            else res.send(err)
                        })
                        // Si (sinon) notre article ne contient pas de commentaire alors
                    } else {
                        req.flash('errors', 'Une erreur c est produit !')
                        res.render('article', {
                            errors: req.flash('errors')
                        })
                    }
                }
                // Sinon on renvoit l'err
                else res.send(err)
            })
        } else {
            req.flash('errors', 'Une erreur c est produit !')
            res.render('article', {
                errors: req.flash('errors')
            })
        }
    },
    // Method Delete All
    deleteAll: async (req, res) => {
        const dbArticle = await Article.find()
        // Fonction de suppression de tout les Articles
        Article.deleteMany((err) => {
            // Si il n'y a pas d'erreur alors il continue
            if (!err) {
                console.log('Tout les article sont supprimer');
                // On supprime tout les Comment
                Comment.deleteMany((err) => {
                    // Si il n'y a pas d'err alors on redirige sur la page article
                    if (!err) {
                        console.log('Tout les Commentaire sont supprimer');
                        req.flash('success', 'Tous les articles ont été supprimer !')
                        res.render('article', {
                            success: req.flash('success'),
                            dbArticle: dbArticle
                        })
                        // Sinon tu renvoie l'err
                    } else res.send(err)
                })
            }
            // Sinon tu renvoie l'err
            else res.send(err)
        })
    }
}