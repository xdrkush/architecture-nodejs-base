/*
 * Import Module
 ****************/ 
const express = require('express'),
      router  = express.Router(),
      upload  = require('./config/multer')

// Controller
const homeController = require('./controllers/homeController')
    , articleController = require('./controllers/articleController')
    , contactController = require('./controllers/contactController')

/*
 * Router
 ***********/

// Home
router.route('/')
  .get(homeController.get)

// Article
router.route('/article')
  .get(articleController.get)
  .post(upload.array('inputArticleArray', 3), articleController.post)
  .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
  .put(upload.array('inputArticleArray', 3), articleController.put)
  .delete(articleController.deleteOne)

// Contact
router.route('/contact')
  .get(contactController.get)

/***********
 * / Router
 */

 
// on export router pour le récupérer dans ../server.js
module.exports = router;
