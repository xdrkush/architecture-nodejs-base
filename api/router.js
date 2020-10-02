/*
 * Import Module
 ****************/ 
const express = require('express'),
    router = express.Router()

/*
 * Controller
 *************/ 
const homeController = require('./controllers/homeController'),
articleController = require('./controllers/articleController'),
userController = require('./controllers/userController'),
contactController = require('./controllers/contactController')

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
    .delete(articleController.deleteOne)

// Article
router.route('/user')
    .get(userController.get)
    .post(userController.post)
    .delete(userController.deleteAll)

// Article ID
router.route('/user/:id')
    .delete(userController.deleteOne)

// Contact
router.route('/contact')
    .get(contactController.get)

/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;