const request = require('supertest');
const app = require('../server');

const assert = require('assert');

describe('SUPERTEST // "/article"', function() {

  it('Get Home (Page home)', (done) => {
    request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err){
          console.log("error");
          done(err);
        }
        else {
            // console.log(res.header);
            // console.log(res)
            done();
        }
      })
  });

  it('Get Article // (Page Article)', (done) => {
    request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err){
          console.log("error");
          done(err);
        }
        else {
            // console.log(res);
            done();
        }
      })
  });

  it('Post Article // (create Article)', (done) => {
    const article = {title: 'Supertest'}
    request(app)
      .post('/article')
      .send(article)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err){
          console.log("error");
          done(err);
        }
        else {
            // console.log(res);
            done();
        }
      })
  });

});