const assert = require('assert');
const Article = require('../api/database/Article');

describe('DELETE // Suppression des Articles', (done) => {

  let article;

  beforeEach((done) => {
    article = new Article({ title: 'test' });
    article.save()
      .then(() => done());
  });

  // it('Supprime un Article Instance', (done) => {
  //   article.deleteOne()
  //     .then(() => Article.findOne({title: 'test' }))
  //     .then((art) => {
  //       console.log(art)
  //       assert(art === null);
  //       done();
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });

  // OK
  it('Supprime multiple article', (done) => {
    Article.deleteMany({ title: 'test' })
      .then(() => Article.findOne({ title: 'test' }))
      .then((art) => {
        assert(art === null);
        done();
      })
      .catch((err) => {
        console.error("Handling promise rejection", err);
      });
  });

  // it('Supprime l article', (done) => {
  //   Article.deleteOne({ title: 'test' })
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art === null);
  //       done();
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });

  // it('Supprime l article avec l id selectionner', (done) => {
  //   Article.deleteOne(article._id)
  //     // the following code block is repeated again and again
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art === null);
  //       done();
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  //   // block end
  // })
})