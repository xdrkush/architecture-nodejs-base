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
      query = { _id: req.params.id },
      noImg = req.files.length === 0,
      singleImg = req.files.length === 1,
      multiple = req.files.length > 1

    console.log('Req.Body')
    console.log(req.body)
    console.log('Req.Files')
    console.log(req.files)

    if (req.body.title && noImg) {
      /*
       *  Changer Texte
       **********************/
      console.log('edit title (no file)')
      Article.updateOne(query, {
          title: req.body.title
        },
        (err) => {
          if (err) console.log(err)
          else res.redirect('/article')
        })

    } else if (req.body.addImg === '') {
      /*
       *  Ajouter Une Image
       **********************/
      const dbArticle = await Article.findById(req.params.id),
        query = {_id: req.params.id},
        dbFiles = dbArticle.galleryImg,
        files = req.files,
        arrayFiles = []

      console.log('?? AddImage')
      console.log(dbFiles)

      // Boucle pour chercher les files existant dans la DB et les ajouter au tableau arrayFiles
      for (let i = 0; i < dbFiles.length; i++) {
        const dbFilename = dbFiles[i].filename
        if (dbFiles) {
          console.log(dbFiles[i].filename)
          arrayFiles.push({
            name: dbFiles[i].name,
            filename: dbFiles[i].filename,
            orifginalname: dbFiles[i].name
          })
        }
      }

      // Boucle pour chercher les req.files et les ajouter au tableau arrayFiles
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

      console.log('?? Array files')
      console.log(arrayFiles)

      // Fonction update Mongoose
      Article.updateOne(query, {
        ...req.body,
        galleryImg: arrayFiles
      },
      (err) => {
        if (!err) {
          res.redirect('/article')
        } else {
          return res.send(err)
        }
      })

    } else if (req.body.deleteImg) {
      /*
       *  Supprimer Une Image
       **********************/
      console.log('delete single img')
      const dbArticle = await Article.findById(req.params.id),
        files = dbArticle.galleryImg
      arrayFiles = []

      console.log('?? req.body')
      console.log(req.body)
      console.log('?? dbArticle')
      console.log(dbArticle)

      for (let i = 0; i < files.length; i++) {
        const dbFilename = files[i].name
        if (dbFilename !== req.body.deleteImg) {
          console.log(dbFilename)
          arrayFiles.push({
            name: files[i].name,
            filename: files[i].filename,
            originalname: files[i].name
          })
        }
      }

      console.log('?? arrayfiles')
      console.log(arrayFiles)

      Article.updateOne(query, {
          ...req.body,
          galleryImg: arrayFiles
        },
        (err) => {
          if (!err) {
            fs.unlink(path.resolve('public/images/' + req.body.deleteImg),
              (err) => {
                if (err) throw err
              })
            res.redirect('/article')
          } else {
            return res.send(err)
          }
        })

    } else if (singleImg) {

      console.log('Single')

    } else if (multiple) {
      /*
       *  Éditer toutes les images
       ****************************/
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
      console.log('Array Files')
      console.log(arrayFiles)
      console.log('ExistFiles')
      console.log(existImg)

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
                    if (err) throw err
                  })
              }
            }
            res.redirect('/article')
          } else {
            return res.send(err)
          }
        })
    }
  },
  deleteOne: async(req, res, next) => {
    const dbArticle = await Article.findById(req.params.id),
      query = { _id: req.params.id },
      files = dbArticle.galleryImg

    console.log(dbArticle);
    console.log('1')

    Article.deleteOne(
      query,
      (err) => {
        if (!err) {
          for (let i = 0; i < files.length; i++) {
            const dbFilename = files[i].filename
            if (files) {
              fs.unlink(path.resolve('public/images/' + files[i].name),
                (err) => {
                  if (err) throw err
                })
            }
          }
          res.redirect('/article')
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