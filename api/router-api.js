/*
 * Import Module
 ****************/
const express = require("express"),
  router = express.Router();

/*
 * Controller
 *************/
const homeController = require("./controllers-api/homeController"),
  articleController = require("./controllers-api/articleController"),
  contactController = require("./controllers-api/contactController");

/*
 * Router
 ***********/

// Home
router.route("/").get(homeController.get);

// Article
router
  .route("/article")
  .get(articleController.get)
  .post(articleController.post)
  .delete(articleController.deleteAll);

// Article ID
router
  .route("/article/:id")
  .get(articleController.getID)
  .put(articleController.editOne)
  .delete(articleController.deleteOne);

// Contact
router.route("/contact").get(contactController.get);

/***********
 * / Router
 */

// on export router pour le récupérer dans ../server.js
module.exports = router;
