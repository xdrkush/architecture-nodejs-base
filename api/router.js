// Import
const express = require('express'),
  router = express.Router(),
  path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
  articleController = require('./controllers/articleController'),
  contactController = require('./controllers/contactController'),
  nodemailerController = require('./controllers/nodemailerController')

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

// Nodemailer
router.route('/nodemailerTest')
    .get(nodemailerController.test)

router.route('/send')
    .get(nodemailerController.sendVerif)

router.route('/verify/:id')
    .get(nodemailerController.verifMail)

module.exports = router;