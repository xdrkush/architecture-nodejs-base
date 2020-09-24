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
            dbArticleID = await Article.findById(query)

        // Ici nous resortons notre constructeur
        Article
            // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(query)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('comment authorID')

            // Nous executons nous recherche
            .exec((err, result) => {
                // Si il y une erreur on la log grace à handleError
                if (err) return handleError(err);

                // Petit check
                console.log('Populate Exec')
                console.log(result)

                // Et on renvoie notre page avec les data
                res.render('articleID', {
                    artID: dbArticleID,
                    comment: result.comment,
                    authorID: result.authorID
                })
            })
    },
    // Method post
    post: async (req, res) => {
        /*
         * Ici c'est un peu spécifique a cause du tuto car en prod nous aurions deja une session avec utilisateur UNIQUE
         * J'ai garder l'utilisateur unique (name) mais en cas qu'il n'y es aucun utilisateur, un utilisateur sera créé avec votre name
         * Je récupère le name (author) du formulaire de création d'article pour créé l'utilisateur
         * et l'utilisateur (name) est deja utilisé vous pouvez le garder sans conflit
         * mais si vous créé des articles avec des author (user.name) différent vous allez créé de  nouveau utilisateur
         */
        // Ici on récupère le req.body.author pour le confronter en cas de deja existant
        const user = await User.findOne({ name: req.body.author })
        console.log(user)

        // Si il existe deja alors il l'utilise
        if (user) {
            console.log('User exist')
            // On définit la construction de notre article
            const article = new Article({
                title: req.body.title,
                author: req.body.author,
                authorID: user._id
            })

            // On va pusher l'id de l'article creer dans notre tableau user afin de garder un historique
            user.article.push(article._id)

            // Et on sauvegarde nos modifications
            article.save((err) => { if (err) return handleError(err) })
            user.save((err) => { if (err) return handleError(err) })

            // Et on redirige
            res.redirect('/article')

        // Si le User n'existe pas il va en créer un
        } else {
            console.log('User Not exist')
            // Attention vous creez un user a chaque creation d'article
            // On definit la construction de notre USER
            const author = new User({
                name: req.body.author
            })

            // On définit la construction de notre Article
            const article = new Article({
                title: req.body.title,
                author: req.body.author,
                authorID: author._id
            })

            // On vient pusher l'id de notre article dans le nouvelle utilisateur creer
            author.article.push(article._id)

            // On sauvergarde nos modification
            article.save((err) => { if (err) return handleError(err) })
            author.save((err) => { if (err) return handleError(err) })

            // Et on redirige
            res.redirect('/article')
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
                    if (!err) {
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