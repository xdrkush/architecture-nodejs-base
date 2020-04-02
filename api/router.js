// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController'),
    cookieController = require('./controllers/cookieController')

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

// Cookie
router.route('/cookie')
    .post(cookieController.cookie)

router.route('/clearCookie')
    .get(cookieController.clearCookie)

router.route('/newCookie')
    .get(cookieController.newCookie)

router.route('/newPtiGato')
    .get(cookieController.newPtiGato)

// Contact
router.route('/contact')
    .get(contactController.get)

module.exports = router;