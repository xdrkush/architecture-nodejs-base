// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController')

// Home
router.route('/')
    .get(homeController.get)
    .post(homeController.post)

// Article
router.route('/article')
    .get(articleController.get)
    .post(articleController.post)

// Contact
router.route('/contact')
    .get(contactController.get)

module.exports = router;