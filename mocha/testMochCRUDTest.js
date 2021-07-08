const assert = require('assert');
const Article = require('../api/database/Test');

// On donne un nom à notre test
describe('Mocha 2 // CRUD', () => {
  let article, dbArticle;

  // Cette boucle sert pour créé un Article a chaque 'it' qu'executera Mocha
  beforeEach((done) => {
    article = new Article({
      title: 'test'
    });
    article.save()
      .then(() => done());
  });

  it('CRUD // Test // CREATE 1 // Créé article title "test"', (done) => {
    const article = new Article({
      title: 'test'
    });

    console.log(article)
    article.save()
      .then((art) => {
        console.log(art)
        assert(!article.isNew);
        done(console.log(art));
      });
  });

  it('CRUD // Test // READ 1 // Article "test"', (done) => {
    Article.findOne({
        title: 'test'
      })
      .then((article) => {
        assert(article.title === "test");
        done(console.log(article));
      })
      .catch((err) => console.log(err));
  })

  it('CRUD // Test // READ 2 // Article "test" ID', (done) => {
    Article.findById({
        _id: article._id
      })
      .then((articleID) => {
        assert(articleID = {});
        done(console.log(articleID));
      });
  })

  it('READ ALL // dbArticle []', (done) => {
    Article.find({})
      .then((db) => {
        assert(db);
        done(console.log(db));
      })
      .catch((err) => console.log(err));
  })

  it('UPDATE // Article "test"', (done) => {
    Article.find({})
      .then((db) => {
        assert(db);
        done(console.log(db))
      })
      .catch((err) => console.log(err));
  })

  // it('CRUD // Test // DELETE 1 // title "test"', (done) => {
  //   Article.deleteOne()
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art = []);
  //       done(console.log(art));
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });

  // it('CRUD // Test // DELETE ALL => title "test"', (done) => {
  //   Article.deleteMany({ title: 'test' })
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art = []);
  //       done(console.log(art));
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });



});