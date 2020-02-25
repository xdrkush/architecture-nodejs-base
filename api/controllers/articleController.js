// Import
const Article = require('../database/Article'),
  path = require('path'),
  fs = require('fs')

module.exports = {
  get: async(req, res) => {
    const dbArticle = await Article.find({})
      // console.log(dbArticle);
    res.render('article', {
      dbArticle
    })
  },
  post: async(req, res) => {
    if (!req.file) {
      res.redirect('/')
    } else {
      Article.create({
          ...req.body,
          imgArticle: `/assets/images/${req.file.originalname}`,
          name: req.file.originalname
        },
        (error, post) => {
          res.redirect('/article')
        })
    }
  },
  put: async(req, res) => {
    console.log(req.file);

    if (!req.file) {
      res.redirect('/')
    } else {
      Article.updateOne({
          ...req.body,
          imgArticle: `/assets/images/${req.file.originalname}`,
          name: req.file.originalname
        },
        (error, post) => {
          res.redirect('/article')
        })
    }
  },
  deleteOne: async (req, res) => {
    const dbArticle = await Article.findById(req.params.id),
          pathImg = path.resolve("public/images/" + dbArticle.name)

    console.log(dbArticle);

    Article.deleteOne({
        _id: req.params.id
      },
      (err) => {
        if (!err) {
          fs.unlink( pathImg, 
            (err) => {
              if (err) {
                console.log(err)
              } else {
                console.log('File Deleted.')
                res.redirect('/article')
              }
            })
        } else {
          res.send(err)
        }
      })
  },
  deleteAll: (req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.redirect('/article')
      } else {
        res.send(err)
      }
    })
  }
}