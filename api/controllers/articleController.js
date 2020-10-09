// Import
const Article = require('../database/Article'),
  path = require('path'),
  fs = require('fs')

/*
 * Controller
 *************/
module.exports = {
  // Method GET
  get: async (req, res) => {

    const dbArticle = await Article.find({})
    res.render('article', { dbArticle })

  },
  // Method POST
  post: async (req, res) => {

    // Condition pour verifier si aucun fichier est envoyer dans le formulaire
    if (!req.file) res.redirect('/')
    // Si Le fichier est bien présent alors on execute ça
    else {
      // On récupère le modele (constructor) de mongoose
      Article.create({
        // On stock toute les infos de notre req.body
        ...req.body,
        // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
        imgArticle: `/assets/images/${req.file.originalname}`,
        // On stock aussi le nom de l'image
        name: req.file.originalname
      // Le callback d'error
      }, (err, post) => {
        if (err) console.log(err)
        res.redirect('/article')
      })
    }

  },
  // Method PUT
  put: async (req, res) => {

    // On declare notre articleID (Objet à éditer)
    const articleID = await Article.findById(req.params.id),
      // Query qui est l'id de notre objet à éditer
      query = { _id: req.params.id },
      // pathImg sera le chemin de notre fichier à supprimer
      pathImg = path.resolve("public/images/" + articleID.name)

    // Condition pour verifier qu'il n'y a pas de fichier dans notre formulaire
    if (!req.file) {

      // condition pour verifier que nous avons un title dans le formulaire
      if (req.body.title) {
        // Ici nous éditons le titre de notre Article selectionner grace à query
        Article.updateOne( query, {
          title: req.body.title
        // et notre callback d'error
        }, (err) => {
          if (err) res.redirect('/')
          else res.redirect('/article')
        })
      } else res.redirect('/')

    // Sinon (Donc si nous avonc un fichier (image) dans notre formulaire)
    } else {
      // Ici nous éditons notre article selectionner grâce à query
      Article.updateOne( query, {
        // on récupère tout notre req.body
        ...req.body,
        // ici on viens stocker le chemin de l'image dans la DB
        imgArticle: `/assets/images/${req.file.originalname}`,
        // Ici on stock le nom de l'image dans notre DB
        name: req.file.originalname
      // Notre callback d'error
      }, (err) => {
        if (err) console.log(err)

        // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
        fs.unlink( pathImg, (err) => {
          if (err) console.log(err)
          //  Ici notre ancienne image viens d'etre supprimer
          else res.redirect('/article')

        })
      })
    }

  },
  // Methods DELETE ONE
  deleteOne: async (req, res) => {

    // Ici on déclare la récupération de notre articleID grace à notre recherche asynchrone filtrer avec notre req.params.id
    const dbArticle = await Article.findById(req.params.id),
      // Ici on déclare le chemin de l'image qui devra etre supprimer
      pathImg = path.resolve("public/images/" + dbArticle.name)

    // Ici nous avons une fonction de suppression de notre article filtrer grace à req.params.id (objet dans la DB)
    Article.deleteOne({ _id: req.params.id }, (err) => {
      // Ici notre callback verifie bien que notre fonction c'est passer sans erreur
      if (err) console.log(err)
      // Et si nous n'avons aucune erreur alors on execute ça
      else {
        // Ici est notre fonction de suppression du fichier (image) avec son callback
        fs.unlink(pathImg, (err) => {
          if (err) console.log(err)
          else res.redirect('/article')
        })
      }
    })

  },
  // METHODS DELETE ALL
  deleteAll: (res) => {

    // Ici nous déclarons directory qui sera le dossier parent contenant toute nos images
    const directory = path.resolve("public/images/")

    // Ici est notre fonction de suppression de tout nos objets (Article) avec son callback
    Article.deleteMany((err) => {
      if (err) console.log(err) 
      // Si nous ne rencontrons pas d'erreur alors on execute ça
      else {
        // Ici cette fonction va nous permetre de lister les fichiers dans directory
        fs.readdir(directory, (err, files) => {
          if (err) console.log(err)
          // Si nous ne rencontrons pas d'erreur alors on execute ça
          else {
            // Ici nous executons une boucle qui va nous permetre de pouvoir supprimer tout le contenu de directory
            for (const file of files) {
              // Ici sont supprimer tout les fichier un par un
              fs.unlink(path.join(directory, file), (err) => {
                if (err) console.log(err)
                else console.log('Delete Img' + file)
              })
            }
            // quand la boucle est fini il nous redirige
            res.redirect('/article')
          }
        })
      }
    })

  }
}