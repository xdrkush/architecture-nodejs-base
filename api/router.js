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
    contactController = require('./controllers/contactController');

/*
 * Router
 ***********/

// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;