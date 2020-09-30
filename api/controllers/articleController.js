/*
 * Import Module
 ****************/
const Article = require('../database/Article')
const format = require('date-format')

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
        // On demande au model Article de créé un Article
        Article.create({
            // Ici on travail une date qui ce retrouve au format 'String'
            created: format.asString('le dd/MM/yyyy à hh:mm:ss', new Date()),
            // Ici on travail une date qui ce retrouve au format 'Date'
            dateISO: format(),
            // Il nous créé un Article avec le model du formulaire envoyer (req.body)
            ...req.body
        })
        // Et on redirige sur la page /article pour que notre nouvelle article soit charger au montage de la page
        res.redirect('/article')

    },
    // Method Delete One
    deleteOne: (req, res) => {
        // Fonction de suppression de un Articles rechercher par son _id
        Article.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on redirige
            if (!err) return res.redirect('/article')
            // Sinon on renvoit l'err
            else res.send(err)
        })
    },
    // Method Delete All
    deleteAll: (req, res) => {
        // Fonction de suppression de tout les Articles
        Article.deleteMany((err) => {
            if (!err) return res.redirect('/article')
            else res.send(err)
        })
    }
}