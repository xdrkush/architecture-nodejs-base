// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../server'); // import to server.js
const path = require('path')

chai.use(chaiHttp)

describe('CHAI // CONTROLLER // ARTICLE', () => {

  // beforeEach((done) => {
  //   Article.deleteOne({}, (err) => { 
  //     done();           
  //   });
  // });

  it('Exemple', (done) => {
   chai.request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200);
        // res.should.be.a('array');
        done(console.log(res.body));
      });
  })

  // Test get /fev
  it(' ChaiRouter // Get Article', (done) => {
    // test route Get
  });

  // Test Post /fev
  it(' ChaiRouter // Post Article', (done) => {
    // Test route Post
  });

  // Test Put /fev/:id
  it(' ChaiRouter // Put Article', (done) => {
    // Test route Put
  });

  it(' ChaiRouter // Delete Article', (done) => {
    // Test route Delete
  });

});