// Import
const Article = require('../database/Article'),
    Comment = require('../database/Comment');
const User = require('../database/User');

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const dbArticle = await Article.find({})
        // Petit log pour checker
        // console.log(dbArticle);
        // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
        res.render('article', {
            dbArticle
        })
    },
    // Method Get ID
    getID: async (req, res) => {
        // On viens definir nos constante
        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.params.id,
            // Ici on recherche l'article ayant comme id le query de notre URL   
            dbArticleID = await Article.findById(query),
            // Ici on recherche les commentaire ayant comme article référant l'id de notre query    
            dbCommentID = await Comment.find({
                articleID: query
            })

        // Ici on renvoit la page articleID avec les data de articles et c'est commentaire
        res.render('articleID', {
            artID: dbArticleID,
            comment: dbCommentID
        })
    },
    post: async (req, res) => {
        // Attention vous creez un user a chaque creation d'article
        const author  = new User ({
            name: req.body.author
        })
        const article = new Article ({
            title: req.body.title,
            author: req.body.author,
            authorID: author._id
        })

        article.save((err) => {
            if (err) return handleError(err)

            author.article = [ article._id ]
            author.save((err) => {
                if (err) return handleError(err)
                res.redirect('/article')
            })
        })

    },
    // Method Delete One
    deleteOne: async (req, res) => {
        // Ici une constante pour récupéré les commentaire lié a notre Article
        const refComment = await Comment.find({
            articleID: req.params.id
        })
        // Log pour checker
        // console.log(refComment)

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
                        if (!err) return res.redirect('/article')
                        // Sinon on renvoie l'err
                        else res.send(err)
                    })
                    // Si (sinon) notre article ne contient pas de commentaire alors
                } else return res.redirect('/article')
            }
            // Sinon on renvoit l'err
            else res.send(err)
        })
    },
    // Method Delete All
    deleteAll: async (req, res) => {
        // Fonction de suppression de tout les Articles
        Article.deleteMany((err) => {
            // Si il n'y a pas d'erreur alors il continue
            if (!err) {
                console.log('Tout les article sont supprimer');
                // On supprime tout les Comment
                Comment.deleteMany((err) => {
                    // Si il n'y a pas d'err alors on redirige sur la page article
                    if (!err)  {
                        console.log('Tout les Commentaire sont supprimer');
                        return res.redirect('/article')
                    // Sinon tu renvoie l'err
                    } else res.send(err)
                })
            }
            // Sinon tu renvoie l'err
            else res.send(err)
        })
    }
}