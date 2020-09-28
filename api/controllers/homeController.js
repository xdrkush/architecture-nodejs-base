const jwt = require('jsonwebtoken');

module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('home')
    },
    post: (req, res) => {

        const token = jwt.sign({
            pseudo: req.body.pseudo,
            email: req.body.email
        }, process.env.JWT_KEY_PRIVATE, {
            expiresIn: '1h'
        })

        res.render('home', {
            token: token,
            message: 'Mon super Message'
        })
    },
    jwt: (req, res) => {
        const tokenHash = req.body.token

        if (tokenHash) {
            const token = jwt.verify(req.body.token, process.env.JWT_KEY_PRIVATE)

            res.render('home', {
                message: 'Vous pouvez modifier les data'
            })
        }
    }
}