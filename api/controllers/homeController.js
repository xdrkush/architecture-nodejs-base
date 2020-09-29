const jwt = require('jsonwebtoken');

module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('home')
    },
    // Method Post
    post: (req, res) => {

        // Ici on va venir signé notre token avec les info qu'il doit contenir
        const token = jwt.sign({
            pseudo: req.body.pseudo,
            email: req.body.email
            // La clef est stocker dans le .env
        }, process.env.JWT_KEY_PRIVATE, {
            // On lui demande d'expirer au bout d'1h
            expiresIn: '1h'
        })

        // On revoit la réponse sur notre page home
        res.render('home', {
            token: token,
            message: 'Votre Token à bien été créé'
        })
    },
    // Method post /jwt
    jwt: (req, res) => {
        // Ici on assigne tokenHash qui est la récupération du token avec le front-end
        // à cette étape le token est hasher
        const tokenHash = req.body.token

        if (tokenHash) {
            // Ici on définit que token est la valeur du token déchiffrer
            const token = jwt.verify(req.body.token, process.env.JWT_KEY_PRIVATE)
            console.log(token)

            // On revoit la réponse sur notre page home
            res.render('home', {
                message: 'Vous pouvez modifier les data'
            })
        }
    }
}