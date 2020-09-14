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
    cookieController = require('./controllers/cookieController')

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

// Contact
router.route('/contact')
    .get(contactController.get)

// ========= Cookie //

// Delete cookie PtiGato & Cookie
router.route('/cookie')
    .post(cookieController.cookie)

// Clear all cookie
router.route('/clearCookie')
    .get(cookieController.clearCookie)

// Create New Cookie
router.route('/newCookie')
    .get(cookieController.newCookie)

// Create New PtiGato
router.route('/newPtiGato')
    .get(cookieController.newPtiGato)
    
// =========/Cookie //

/***********
 * / Router
 */

// on export router pour le récupérer dans ../server.js
module.exports = router;