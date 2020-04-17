const assert = require('assert');
const Article = require('../api/database/Article');

describe('Deleting & Update // Article', async () => {

  let article;

  // beforeEach((done) => {
  //   article = new Article({ title: 'test' });
  //   article.save()
  //     .then(() => done());
  // });

  // function assertHelper(statement, done) {
  //   statement
  //     .then(() => Article.find({}))
  //     .then((arts) => {
  //       assert(arts.length === 1)
  //       assert(arts[0].title === 'Test 2')
  //       done()
  //     })
  //     .catch(done);
  // }

  // OK
  // it('sets and saves article using an instance', (done) => {
  //   article.set('title', 'Test 2'); //not updated in mongodb yet
  //   assertHelper(article.save(), done);
  //  });

  // OK
  // it('update article on instance', (done) => {
  //   //useful to update multiple fields of the object
  //   assertHelper(article.updateOne({ title: 'Test 2' }), done);
  // });

  // OK
  // it('update all matching particle using model', (done) => {
  //   assertHelper(Article.updateOne({ title: 'test' }, { title: 'Test 2' }), done);
  // });

  // OK
  // it('update one article using model', (done) => {
  //   assertHelper(Article.findOneAndUpdate({ title: 'test' }, { title: 'Test 2' }), done);
  // });

  // OK
  // it('update one article with id using model', (done) => {
  //   assertHelper(Article.findByIdAndUpdate(article._id, { title: 'Test 2' }), done);
  // });
});