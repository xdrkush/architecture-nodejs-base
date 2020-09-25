const
    algolia = require('algoliasearch'),
    client = algolia(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY),
    index = client.initIndex(process.env.ALGOLIA_APP_NAME),
    Article = require('../database/Article'),
    User = require('../database/User')

index.setSettings({ enableRules: true })

module.exports = {
    get: async (req, res) => {
        // Utile pour initialiser algolia avec vos data mongodb
        // const objects = await Article.find()
        // const objects = []
        // index
        //     .saveObjects(objects, { autoGenerateObjectIDIfNotExist: true })
        //     .then(({ objectIDs }) => {
        //         console.log(objectIDs);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        res.render('search')
    },
    // Method post
    search: (req, res) => {
        index
            .search(req.body.algolia, { hitsPerPage: 5})
            .then(({ hits }) => {
                console.log(hits)
                res.render('search', {
                    result: hits,
                    count: hits.length
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}