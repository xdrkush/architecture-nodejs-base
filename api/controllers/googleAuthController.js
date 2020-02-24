/*
 *
 * Controller /auth/google
 ************************************/

const express = require('express')
    , router = express.Router()
    , User = require('../database/User')
    , passport = require('passport')

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/redirect', passport.authenticate('google'), async (req, res) => {
    let userAuth = await User.findOne({ _id: req.user._id })
    if (!userAuth) {
        console.log("pas ds la db");
        res.redirect('/');
    } else {
        const dbUser = await User.find({})
            , pseudo = req.user.pseudo
            // L'on déclare la récupération de notre req.user pour pouvoir lui attribuer notre function
            // Par la suite
            , sess = req.session

        User.findOne({ pseudo }, (error, User) => {
            // On définit quelle data ce doivent de correspondre avec lesquel
            // c'est ici que l'on pourra définir l'objet de la session
            // sess.name / sess.name / sess.status / sess.isVerified ...
            sess.email = User.email
            sess.status = User.status
            sess.pseudo = User.pseudo
            sess.isVerified = User.isVerified
            sess.imgUser = User.imgUser
            sess.userId = User._id

            if (User) {

                if (sess.status === 'user') {
                    // on défini que notre _id correspondra avec notre userId de notre session
                    req.session.userId = User._id
                    console.log('OK 1')
                    // Une fois le check effectuer on lui demande de renvoyer les data de notre session 
                    res.redirect('/')
                } else {
                        console.log('Mot de passe incorrect')
                        res.redirect('/')
                    
                }
            }
        })
    }
})

module.exports = router
