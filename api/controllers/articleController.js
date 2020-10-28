// Import
const Article = require('../database/Article'),
    path = require('path'),
    fs = require('fs'),
    upload = require('../config/multer')

/*
 * Controller
 *************/
module.exports = {
    // Method Get (Récupération de nos data grace à mongoose et son constructeur)
    get: async (req, res) => {
        const dbArticle = await Article.find({})
        // Renvoie de la view article et c'est data
        res.render('article', {
            dbArticle // = dbArticle: dbArticle
        })
    },
    // Method Post (nous créons un article avec ses image)
    post: async (req, res, next) => {
        const dbArticle = await Article.find({}),
            // tableau du req.files
            files = req.files,
            // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
            arrayFiles = [];

        // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
        // nos objets dans le tableaux
        for (let i = 0; i < files.length; i++) {
            if (files) {
                // C'est grace à la method push que nous inscrivont nos data dans nos Objets
                // Et nos objets dans le tableau
                arrayFiles.push({
                    name: files[i].filename,
                    filename: `/assets/images/${files[i].filename}`,
                    originalname: files[i].originalname
                })
            }
        }

        if (req.fileValidationError) {
            return res.render('article', {
                dbArticle, 
                error: req.fileValidationError
            });
        }

        // Si il n'y a pas de req.files tu redirige
        if (!req.files) res.redirect('/')
        else {
            // On push nos data dans la DB grace Mongoose
            Article.create({
                ...req.body,
                // imgArticle: `/assets/images/${req.file.originalname}`,
                galleryImg: arrayFiles

                // CallBack de la function Mongoose
            }, (err) => {
                if (err) throw err
                res.redirect('/article')
            })
        }
    },
    // Method Put ()
    put: async (req, res, next) => {
        const dbArticle = await Article.findById(req.params.id),
            // Query est l'id passé dans le formulaire de req post
            query = {
                _id: req.params.id
            },
            // raccourcie
            files = req.files,
            // Tableau existant
            existImg = dbArticle.galleryImg,
            // On check si req.files n'a aucun objet
            noImg = files.length === 0,
            // On check si req.files à 1 objet
            singleImg = files.length === 1,
            // On check si req.files à au moins 1 objet
            multiple = files.length > 1,
            // le tableau en attente de data pour l'injecter dans l'objet une fois editer
            arrayFiles = []

        // Pour changer que le titre
        if (req.body.title && noImg) {
            /*
             *  Changer Texte
             **********************/
            console.log('edit title (no file)')
            // Function Mongoose
            Article.updateOne(query, {
                title: req.body.title

                // CallBack de la function mongoose
            }, (err) => {
                if (err) throw err
                res.redirect('/article')
            })
            // Ajouter une image dans notre galleryImg (MAX 3)
        } else if (req.body.addImg === '') {
            /*
             *  Ajouter Une Image
             **********************/
            console.log('Add One Image')
            const dbFiles = dbArticle.galleryImg

            // Boucle pour chercher les files existant dans la DB et les ajouter au tableau arrayFiles
            for (let i = 0; i < dbFiles.length; i++) {
                const dbFilename = dbFiles[i].filename
                if (dbFiles) {
                    // On push les data existante dans arrayFiles
                    arrayFiles.push({
                        name: dbFiles[i].name,
                        filename: dbFiles[i].filename,
                        originalname: dbFiles[i].name
                    })
                }
            }

            // Boucle pour chercher les req.files et les ajouter au tableau arrayFiles
            for (let i = 0; i < files.length; i++) {
                if (files) {
                    // On push les data de notre req.files dans arrayFiles
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/images/${files[i].filename}`,
                        originalname: files[i].originalname
                    })
                }
            }

            // Fonction update Mongoose
            Article.updateOne(query, {
                ...req.body,
                galleryImg: arrayFiles

                // CallBack de la function Mongoose
            }, (err) => {
                if (err) throw err
                res.redirect('/article')
            })


            // delete 1 image de notre galleryImg
        } else if (req.body.deleteImg) {
            /*
             *  Supprimer Une Image
             **********************/
            console.log('delete single img')
            const files = dbArticle.galleryImg

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

            // Fonction update Mongoose
            Article.updateOne(query, {
                ...req.body,
                galleryImg: arrayFiles

                // call back fonction mongoose
            }, (err) => {
                if (err) throw err
                // unlink suprimera l'élément égale a notre req.body
                // voir le input dans la view html
                fs.unlink(path.resolve('public/images/' + req.body.deleteImg), (err) => {
                    if (err) throw err
                    res.redirect('/article')
                })
            })

            // editer 1 image de notre galleryImg
        } else if (singleImg) {
            /*
             *  Éditer une seule images
             ************************** */
            console.log('edit single img')

            const arrayFiles = existImg

            // boucle pour editer notre tableau
            for (let i = 0; i < arrayFiles.length; i++) {
                if (arrayFiles[i].name === req.body.exImg) {
                    arrayFiles[i].name = files[0].filename
                    arrayFiles[i].filename = `/assets/images/${files[0].filename}`
                    arrayFiles[i].originalname = files[0].originalname
                }
            }

            // Fonction mongoose pour mettre à jour nos data
            Article.updateOne(query, {
                galleryImg: arrayFiles

                // Callback function mongoose
            }, (err) => {
                if (err) throw err
                fs.unlink(path.resolve('public/images/' + req.body.exImg), (err) => {
                    if (err) throw err
                })
                res.redirect('/article')
            })

            // Ajouter plusieurs image dans notre galleryImg
        } else if (multiple) {
            /*
             *  Éditer toutes les images
             *************************** */
            console.log('add multiple img')

            // boucle pour créé notre nouveau tableau
            for (let i = 0; i < files.length; i++) {
                if (files) {
                    // On push nos nouveau objet de notre req.files dans notre arrayFiles
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/images/${files[i].filename}`,
                        originalname: files[i].originalname
                    }, (err) => {
                        if (err) throw err
                    })
                }
            }

            // Fonction mongoose pour mettre à jour nos data
            Article.updateOne(query, {
                ...req.body,
                galleryImg: arrayFiles

                // Callback function mongoose
            }, (err) => {
                if (err) throw err
                // Boucle pour la suppression des images existante
                for (let i = 0; i < existImg.length; i++) {
                    if (existImg) {
                        fs.unlink(path.resolve('public/images/' + existImg[i].name), (err) => {
                            if (err) throw err
                        })
                    }
                }
                res.redirect('/article')
            })
        }
    },
    // Method delete un objet dans la db avec les image en relation
    deleteOne: async (req, res, next) => {
        /*
         *  Supprimer notre article
         ***************************/
        const dbArticle = await Article.findById(req.params.id),
            query = {
                _id: req.params.id
            },
            files = dbArticle.galleryImg

        // ici on supprime nos objet de la collection
        Article.deleteOne(
            query,

            // Callback de la fonction mongoose
            (err) => {
                if (err) throw err
                // ici on vient faire une boucle sur les image contenu par l'objet
                for (let i = 0; i < files.length; i++) {
                    if (files) {
                        // ici on supprime toutes les images en relation avec notre objet
                        fs.unlink(path.resolve('public/images/' + files[i].name), (err) => {
                            if (err) throw err
                        })
                    }
                }
                // puis on redirige
                res.redirect('/article')
            })
    },
    // Method delete tout les objet et toute les images stocker
    deleteAll: (req, res) => {
        // on définit notre répertoire parent de nos images pour allez les suprimer plus tard
        const directory = path.resolve("public/images/")

        // Ici on supprime tous les objets dans notre Collection
        Article.deleteMany((err) => {
            if (err) throw err
            // on appel fs pour récupérer nos fichiers
            fs.readdir(directory, (err, files) => {
                if (err) throw err
                // notre boucle viens selectionner toutes nos images
                for (const file of files) {
                    // et fs viens supprimer tout les fichiergrace au callback
                    fs.unlink(path.join(directory, file), (err) => {
                        if (err) throw err
                    })
                }
                // puis on redirige
                res.redirect('/article')
            })
        })
    }
}