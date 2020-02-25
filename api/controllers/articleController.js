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
  put: async (req, res) => {
    // Probleme suppression (plusieur image Conflit )
    const dbArticle = await Article.findById(req.params.id),
          query = {_id: req.params.id}
      pathImg = path.resolve("public/images/" + dbArticle.name)

    console.log(req.file)

    if (!req.file) {
      if (req.body.title) {
        console.log('edit title (no file)')
        console.log(dbArticle)

        Article.updateOne( query, {
          title: req.body.title
        },
        (err) => {
          if (err) res.redirect('/')
          else res.redirect('/article')
        })
      } else {
        res.redirect('/')
      }
    } else {
      Article.updateOne( query, {
          ...req.body,
          imgArticle: `/assets/images/${req.file.originalname}`,
          name: req.file.originalname
        },
        (error, post) => {
          fs.unlink( pathImg,
            (err) => {
              if (err) {
                console.log(err)
              } else {
                console.log('File Deleted.')
                res.redirect('/article')
              }
            })
        })
    }
  },
  deleteOne: async(req, res) => {
    const dbArticle = await Article.findById(req.params.id),
      pathImg = path.resolve("public/images/" + dbArticle.name)

    console.log(dbArticle);

    Article.deleteOne({
        _id: req.params.id
      },
      (err) => {
        if (!err) {
          fs.unlink(pathImg,
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
    const directory = path.resolve("public/images/")

    Article.deleteMany((err) => {
      if (!err) {
        fs.readdir(directory, (err, files) => {
          if (!err) {
            for (const file of files) {
              fs.unlink(path.join(directory, file), (err) => {
                if (!err) {
                  console.log('Delete Img' + file)
                } else {
                  console.log(err)
                }
              })
            }
            res.redirect('/article')
          } else {
            console.log(err)
          }
        })
      } else {
        console.log(err)
      }
    })
  }
}