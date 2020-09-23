// Import
const Comment = require('../database/Comment');
const User    = require('../database/User')
const Article = require('../database/Article')

module.exports = {
    // Method Post
    post: async (req, res) => {
        const query   = { _id: req.params.id }

        const author  = await User.find({ name: 'drk' })
        const article = await Article.findById(query)

        const comment = new Comment({
            content: req.body.content,
            articleID: article._id,
            author: req.body.author,
            authorID: author._id
        })

        article.comment = [ comment._id ]
        author.comment = [ comment._id ]
    
        console.log(author)
        console.log('author')
        console.log(article)
        console.log('article')
        
        comment.save((err) => { if (err) return handleError(err) })
        article.save((err) => { if (err) return handleError(err) })
        author.save((err) => { if (err) return handleError(err) })


        // Et on redirige sur notre article parent
        res.redirect(`/article/${article._id}`)
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