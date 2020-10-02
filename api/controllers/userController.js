/*
 * Import Module
 ****************/
const User = require('../database/User')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const dbUser = await User.find({})
        // Petit log pour checker
        console.log(dbUser);
        // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
        res.render('user', {
            dbUser
        })

    },
    // Method Post
    post: async (req, res) => {
        // Variable de récupération de tout les Articles
        const dbUser = await User.find({})
        // On demande au model Article de créé un Article
        User.create({
            // Il nous créé un Article avec le model du formulaire envoyer (req.body)
            ...req.body
        })
        // Et on redirige sur la page /article pour que notre nouvelle article soit charger au montage de la page
        res.redirect('/user')

    },
    // Method Delete One
    deleteOne: (req, res) => {
        // Fonction de suppression de un Articles rechercher par son _id
        User.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on redirige
            if (!err) return res.redirect('/user')
            // Sinon on renvoit l'err
            else res.send(err)
        })
    },
    // Method Delete All
    deleteAll: (req, res) => {
        // Fonction de suppression de tout les Articles
        User.deleteMany((err) => {
            if (!err) return res.redirect('/user')
            else res.send(err)
        })
    }
}