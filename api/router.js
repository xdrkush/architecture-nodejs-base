/*
 * Import Module
 ****************/ 
const express = require('express'),
    router = express.Router(),
    path = require('path')

/*
 * Controller
 *************/ 
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController'),
    commentController = require('./controllers/commentController')

/*
 * Router
 ***********/

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
    .get(articleController.getID)
    .delete(articleController.deleteOne)

// Comment ID
router.route('/comment/:id')
    .post(commentController.post)
    .delete(commentController.deleteOne)

// Contact
router.route('/contact')
    .get(contactController.get)

/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;