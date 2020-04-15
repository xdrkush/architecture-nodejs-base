// Import
const Article = require('../database/Article'),
  path = require('path'),
  fs = require('fs')

module.exports = {
  // Method Get (Récupération de nos data grace à mongoose et son constructeur)
  get: async(req, res) => {
    const dbArticle = await Article.find({})
      console.log(JSON.stringify(dbArticle.galleryImg));
    // Renvoie de la view article et c'est data
    res.render('article', {
      dbArticle
    })
  },
  // Method Post (nous créons un article avec ses image)
  post: async(req, res, next) => {
    const dbArticle = await Article.find({}),
      // tableau du req.files
      files = req.files,
      // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
      arrayFiles = []

    console.log('1')
    console.log(req.body)
    console.log('2')
    console.log(req.files)

    // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
    // nos objets dans le tableaux
    for (let i = 0; i < files.length; i++) {
      const dbFilename = files[i].filename
      if (files) {
        console.log(files[i].filename)
        // C'est grace à la method push que nous inscrivont nos data dans nos Objets
        // Et nos objets dans le tableau
        arrayFiles.push({
          name: files[i].filename,
          filename: `/assets/images/${files[i].filename}`,
          orifginalname: files[i].originalname
        })
      }
    }

    console.log('3')
    console.log(arrayFiles)

    // Si il n'y a pas de req.files tu redirige
    if (!req.files) {
      res.redirect('/')
    } else {
      // On push nos data dans la DB grace Mongoose
      Article.create({
          ...req.body,
          // imgArticle: `/assets/images/${req.file.originalname}`,
          galleryImg: arrayFiles
        },
        // CallBack de la function Mongoose
        (error, post) => {
          res.redirect('/article')
        })
    }
  },
  put: async(req, res, next) => {
    const dbArticle = await Article.findById(req.params.id),
      // Query est l'id passé dans le formulaire de req post
      query = { _id: req.params.id },
      // On check si req.files n'a aucun objet
      noImg = req.files.length === 0,
      // On check si req.files à 1 objet
      singleImg = req.files.length === 1,
      // On check si req.files à au moins 1 objet
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
      // Function Mongoose
      Article.updateOne(query, {
          title: req.body.title
        },
        // CallBack de la function mongoose
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
        // Gallery Existante
        dbFiles = dbArticle.galleryImg,
        // req.files
        files = req.files,
        // Definition d'un tableau qui va acceuillir
        arrayFiles = []

      console.log('?? AddImage')
      console.log(dbFiles)

      // Boucle pour chercher les files existant dans la DB et les ajouter au tableau arrayFiles
      for (let i = 0; i < dbFiles.length; i++) {
        const dbFilename = dbFiles[i].filename
        if (dbFiles) {
          console.log(dbFiles[i].filename)
          // On push les data existante dans arrayFiles
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
          // On push les data de notre req.files dans arrayFiles
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
      // CallBack de la function Mongoose
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
        files = dbArticle.galleryImg,
        arrayFiles = []

      console.log('?? req.body')
      console.log(req.body)
      console.log('?? dbArticle')
      console.log(dbArticle)

      // boucle de selection de l'objet à supprimer
      for (let i = 0; i < files.length; i++) {
        const dbFilename = files[i].name
        // on ajoute la condition pour que l'élément égale a notre req.body ne sois pas
        // re-pusher dans notre tableau que l'on va ensuite inscrir dans la DB
        if (dbFilename !== req.body.deleteImg) {
          console.log(dbFilename)
          // On push les data de notre req.files dans arrayFiles
          arrayFiles.push({
            name: files[i].name,
            filename: files[i].filename,
            originalname: files[i].name
          })
        }
      }

      console.log('?? arrayfiles')
      console.log(arrayFiles)

      // Fonction update Mongoose
      Article.updateOne(query, {
          ...req.body,
          galleryImg: arrayFiles
        },
        // CallBack de la function Mongoose
        (err) => {
          if (!err) {
            // unlink suprimera l'élément égale a notre req.body
            // voir le input dans la view html
            fs.unlink(path.resolve('public/images/' + req.body.deleteImg),
            // CallBack de la function unlink
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

      // boucle pour créé notre nouveau tableau
      for (let i = 0; i < files.length; i++) {
        const dbFilename = files[i].filename
        if (files) {
          console.log(files[i].filename)
          // On push nos nouveau objet de notre req.files dans notre arrayFiles
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

      // Fonction mongoose pour mettre à jour nos data
      Article.updateOne(query, {
          ...req.body,
          galleryImg: arrayFiles
        },
        // Callback function mongoose
        (err) => {
          if (!err) {
            // Boucle pour la suppression des images existante
            for (let i = 0; i < existImg.length; i++) {
              const dbFilename = existImg[i].filename
              if (existImg) {
                fs.unlink(path.resolve('public/images/' + existImg[i].name),
                  // Callback de la function unlink
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
    /*
       *  Supprimer notre article
       ***************************/
    const dbArticle = await Article.findById(req.params.id),
      query = { _id: req.params.id },
      files = dbArticle.galleryImg

    console.log(dbArticle);
    console.log('1')

    Article.deleteOne(
      query,
      // Callback de la fonction mongoose
      (err) => {
        if (!err) {
          for (let i = 0; i < files.length; i++) {
            const dbFilename = files[i].filename
            if (files) {
              fs.unlink(path.resolve('public/images/' + files[i].name),
                // Callback de la function unlink
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