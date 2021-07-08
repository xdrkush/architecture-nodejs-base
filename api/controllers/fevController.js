/*
 * Import Module
 ****************/
const Article = require('../database/Article')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: (req, res) => {
        Article
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
                // res.render('home', {
                //     dbArticle: data
                // })
            })
    },
    // Method get id
    getID: (req, res) => {
        Article
            .findById(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },
    getByTitle: (req, res) => {
        console.log(req.params)
        Article
            .find({ title: req.params.title })
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },
    // Method Post
    post: (req, res) => {
        Article
            .create(req.body, (err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },
    put: (req, res) => {
        Article
            .findByIdAndUpdate(req.params.id,
                { title: req.body.title },
                (err, data) => {
                    if (err) console.log(err);

                    res.json(data)
                })
    },
    // Method Delete One
    deleteOne: (req, res) => {
        Article
            .findByIdAndRemove(req.params.id)
            .exec(async (err, data) => {
                if (err) console.log(err);

                const result = await Article.findById(params)

                res.json({
                    success: 'Article delete'
                })
            })
    }
}