const jwt = require('jsonwebtoken'),
      fs  = require('fs')

module.exports = {
    get: (req, res) => {
        res.render('home')
    },
    post: (req, res) => {
        console.log('Post Home (test JWT)')
        const privateKey = fs.readFileSync('api/config/private.pem')

        console.log(privateKey)

        // const payload = {
        //     pseudo: req.body.pseudo,
        //     email: req.body.email
        // }
        // console.log('payload')
        // console.log(payload)

        // let token = jwt.sign(payload, privateKey, {
        //     algorithm: 'RS256',
        //     expiresIn: 1440
        // })
        // console.log('token crypt')
        // console.log(token)

        // const decoded = jwt.verify(token, privateKey)
        // console.log('token Decod')
        // console.log(decoded)

        res.render('home', {
            // decoded: decoded,
            message: 'ferfefezfzef'
        })
    }
}