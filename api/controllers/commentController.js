// Import
const Comment = require('../database/Comment');

module.exports = {
    // Method Post
    post: (req, res) => {
        // Ici on vient créé notre commentaire avec le req.body de notre formulaire 
        Comment.create({
            // Une expression qui récupère le formulaire tel quel
            ...req.body,
            // Ici on viens inscrire la date au moment T
            date: Date.now()
        })
        // Et on redirige sur notre article parent
        res.redirect(`/article/${req.body.articleID}`)
    },
    // Method Delete One
    deleteOne: async(req, res) => {
        // Ici on vient récupéré l'article parent de notre commentaire pour la redirection
        const articleParentComment = await Comment.findById(req.params.id)
        // Fonction de suppression de un Commentaire rechercher par son _id
        Comment.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on redirige sur l'article parent
            if (!err) return res.redirect(`/article/${articleParentComment.articleID}`)
            // Sinon on renvoit l'err
            else res.send(err)
        })
    }
}