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
  post: async(req, res, next) => {
    const dbArticle = await Article.find({}),
      files = req.files,
      arrayFiles = []

    console.log('1')
    console.log(req.body)
    console.log('2')
    console.log(req.files)

    for (let i = 0; i < files.length; i++) {
      const dbFilename = files[i].filename
      if (files) {
        console.log(files[i].filename)
        arrayFiles.push({
          name: files[i].filename,
          filename: `/assets/images/${files[i].filename}`,
          orifginalname: files[i].originalname
        })
      }
    }

    console.log('3')
    console.log(arrayFiles)

    if (!req.files) {
      res.redirect('/')
    } else {

      Article.create({
          ...req.body,
          // imgArticle: `/assets/images/${req.file.originalname}`,
          galleryImg: arrayFiles
        },
        (error, post) => {
          res.redirect('/article')
        })
    }
  },
  put: async(req, res, next) => {
    const dbArticle = await Article.findById(req.params.id),
      query = { _id: req.params.id }
    pathImg = path.resolve("public/images/" + dbArticle.name)

    console.log(req.files)

    if (!req.files) {
      if (req.body.title) {
        console.log('edit title (no file)')
        console.log(dbArticle)

        Article.updateOne(query, {
            title: req.body.title
          },
          (err) => {
            if (err) res.redirect('/')
            else res.redirect('/article')
          })
      }
      next()
    } else if (req.files) {
      const dbArticle = await Article.findById(req.params.id),
        files = req.files,
        existImg = dbArticle.galleryImg,
        arrayFiles = []

      console.log('1')
      console.log(req.body)
      console.log('2')
      console.log(req.files)

      for (let i = 0; i < files.length; i++) {
        const dbFilename = files[i].filename
        if (files) {
          console.log(files[i].filename)
          arrayFiles.push({
            name: files[i].filename,
            filename: `/assets/images/${files[i].filename}`,
            orifginalname: files[i].originalname
          })
        }
      }

      console.log(arrayFiles)

      Article.updateOne(query, {
          ...req.body,
          galleryImg: arrayFiles
        },
        (err) => {
          if (!err) {
            for (let i = 0; i < existImg.length; i++) {
              const dbFilename = existImg[i].filename
              if (existImg) {
                fs.unlink(path.resolve('public/images/' + existImg[i].name),
                  (err) => {
                    if (err) console.log(err)
                    else console.log('galleryImg Supprimée') && res.redirect('/article')
                  })
              }
            }
          } else {
            res.send(err)
          }
        })
      }
  },
  deleteOne: async(req, res) => {
    const dbArticle = await Article.findById(req.params.id),
      query = { _id: req.params.id }
    files = dbArticle.galleryImg

    console.log(dbArticle);

    Article.deleteOne(
      query,
      (err) => {
        if (!err) {
          for (let i = 0; i < files.length; i++) {
            const dbFilename = files[i].filename
            if (files) {
              fs.unlink(path.resolve('public/images/' + files[i].name),
                (err) => {
                  if (err) console.log(err)
                  else console.log('galleryImg Supprimée') && res.redirect('/article')
                })
            }
          }
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