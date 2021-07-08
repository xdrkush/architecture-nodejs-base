// DB


// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const { app, db } = require('../server');
const path = require('path')

chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  ArticleController', () => {

    beforeEach((done) => {
      Article.deleteOne({}, (err) => { 
        done();           
      });
    });

    it(' ChaiRouter // Get Article', (done) => {
      chai.request(app)
        .get('/article')
        .set('Accept', 'application/json')
        // .expect(200)
        .end((err, res) => {
          // console.log(res)
          if (err) return done(err)
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });

    it(' ChaiRouter // Post Article', (done) => {
      let article = {
        title: 'test Chai Post'
      }

      chai.request(app)
        .post("/article")
        .field("Content-Type", "multipart/form-data")
        .field("title", "SuperTest")
        .attach("imgArticle", path.resolve(__dirname, "./licorn.jpg"))
        .end(function(err, res) {
          if (err) {
            don(err);
          }
          expect(res.status).to.equal(200);
          done()
        });
    });

    // it(' ChaiRouter // Put Article', (done) => {
    //   let article = new Article({
    //         title: 'test Chai Edit'
    //       }),
    //       articleEdit = {title: 'test Chai Edit 2'}
    //   chai.request(app)
    //     .post('/article/' + article.id)
    //     .send(articleEdit)
    //     .end((err, res) => {
    //         res.should.be.a('object');
    //         done();
    //     });
    // });

    // it(' ChaiRouter // Delete Article', (done) => {
    //   let article = new Article({
    //     title: 'test Chai Delete'
    //   })
    //   chai.request(app)
    //     .delete('/article/' + article.id)
    //     .end((err, res) => {
    //         res.should.be.a('object');
    //         done();
    //     });
    // });

});