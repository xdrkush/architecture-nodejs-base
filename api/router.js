// Import
const express = require('express'),
  router = express.Router()

// Controller
const homeController = require('./controllers/homeController')
    , articleController = require('./controllers/articleController')
    , contactController = require('./controllers/contactController')


// Multer
const multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname,
      date = Date.now()
    cb(null, ext)
  }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 4098 * 4098,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
        }
    }
})

// Home
router.route('/')
  .get(homeController.get)

// Article
router.route('/article')
  .get(articleController.get)
  .post(upload.single('imgArticle'), articleController.post)
  .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
  .put(upload.single('imgArticle'), articleController.put)
  .delete(articleController.deleteOne)

// Contact
router.route('/contact')
  .get(contactController.get)

module.exports = router;