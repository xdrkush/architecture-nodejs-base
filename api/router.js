// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    adminController = require('./controllers/adminController'),
    contactController = require('./controllers/contactController');

// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

// Admin
// 2nd Layout 
router.route('/admin')
    .get(adminController.get)

module.exports = router;