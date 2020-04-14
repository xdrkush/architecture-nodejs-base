// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

const { check, validationResult } = require('express-validator');


// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController')

// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)
    .post([
        check('email')
            .isEmail(),
        check('title')
            .isLength({ min: 5 }).withMessage('Le titre doit comporter minimum 5 caractères ;)')
    ], articleController.post)
    .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
    .delete(articleController.deleteOne)



// Contact
router.route('/contact')
    .get(contactController.get)

module.exports = router;