const assert = require('assert');
const Article = require('../api/database/Article');

// On donne un nom à notre test
describe('Mocha Fev // CRUD', () => {
    let article;

    // Cette boucle sert pour créé un Article a chaque 'it' qu'executera Mocha
    beforeEach((done) => {
        article = new Article({
            title: 'test'
        });
        article.save()
            .then(() => done());
    });

    // Get Article
    it('Get Article', (done) => {
        Article
            .find()
            .exec((err, data) => {
                if (err) console.log(err);
                assert.notStrictEqual([], data)
                done(console.log(data))
            })

    })

    // Get ID Article
    it('Get ID', (done) => {
        const params = {
            id: article._id
        }
        Article
            .findById(params.id)
            .exec((err, data) => {
                if (err) console.log(err);
                assert.notStrictEqual({}, data)
                done(console.log(data))
            })

    })

    // Create Article
    it('Create Fev', (done) => {
        const body = { title: 'FEV' }

        Article
            .create(body, (err, data) => {
                if (err) console.log(err);
                assert.strictEqual('FEV', data.title)
                done(console.log(data))
            })

    })

    // Get by "title"  Article
    it('Get By Title', (done) => {
        Article
            .find({ title: 'FEV' })
            .exec((err, data) => {
                if (err) console.log(err);
                assert.notStrictEqual({}, data)
                done(console.log(data))
            })

    })

    // Edit article
    it('Edit Article', (done) => {
        const params = { _id: article._id }
        Article
            .findByIdAndUpdate(params, { title: 'FEV Edit' })
            .exec(async (err, data) => {
                if (err) console.log(err);

                const result = await Article.findById(params)

                assert.strictEqual('FEV Edit', result.title)
                done(console.log(result))
            })

    })

    // Delete article
    it('Delete Article', (done) => {
        const params = { _id: article._id }
        Article
            .findByIdAndRemove(params)
            .exec(async (err, data) => {
                if (err) console.log(err);

                const result = await Article.findById(params)

                assert.notStrictEqual({}, result)
                done(console.log(result))
            })

    })

})