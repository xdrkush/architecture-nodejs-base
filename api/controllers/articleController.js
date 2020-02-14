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
            imgArticle: `/assets/images/${req.file.originalname}`
          },
          (error, post) => {
            res.redirect('/article')
          })
      }
  },
  deleteOne: (req, res) => {
    Article.deleteOne({
        _id: req.params.id
      },
      (err) => {
        if (!err) {
          res.redirect('/article')
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