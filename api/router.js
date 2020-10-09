/*
 * Import Module
 ****************/ 
const express = require('express'),
      router  = express.Router(),
      upload  = require('./config/multer')

/*
 * Controller
 *************/ 
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
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
  // Ici nous appelons le middleware de multer pour pouvoir traiter notre image dans notre controller
  .post(upload.single('imgArticle'), articleController.post)
  .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
  // Ici nous appelons le middleware de multer pour pouvoir traiter notre image dans notre controller
  .put(upload.single('imgArticle'), articleController.put)
  .delete(articleController.deleteOne)

// Contact
router.route('/contact')
  .get(contactController.get)

/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;
