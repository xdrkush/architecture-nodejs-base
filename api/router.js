// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController'),
    userController = require('./controllers/userController'),
    authGoogleController = require('./controllers/googleAuthController')

// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)
    .post(articleController.post)
    .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
    .delete(articleController.deleteOne)

// Contact
router.route('/contact')
    .get(contactController.get)

// Users
router.route('/user/:id')
    .delete(userController.deleteOne)

// Auth
router.use('/auth/google', authGoogleController)

module.exports = router