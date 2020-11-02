// Import
const Comment = require('../database/Comment');
const Article = require('../database/Article')

module.exports = {
    // Method Post
    post: async (req, res) => {
        // On définit query comme un objet acceuillant notre req.params.id
        const query = {
            _id: req.params.id
        }

        // On définit nos Objet en relation avec notre commentaire
        // Attention a bien utilisé un nom d'autheur définit dans la db pendant la creation des articles
        const article = await Article.findById(query)

        // On définit notre construction de Commentaire
        const comment = new Comment({
            content: req.body.content,
            articleID: article._id,
            author: req.body.author
        })

        // Ici on incrémente nos commentaire dans nos model en relation
        article.comment.push(comment._id)

        // On sauvegarde nous modification
        comment.save((err) => {
            if (err) return handleError(err)
        })
        article.save((err) => {
            if (err) return handleError(err)
        })

        // Et on redirige sur notre article parent
        res.redirect(`/article/${article._id}`)

    },
    // Method Delete One
    deleteOne: async (req, res) => {
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