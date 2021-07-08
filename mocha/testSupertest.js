const request = require('supertest');
const app = require('../server');
const path = require('path');

const assert = require('assert');

describe('SUPERTEST // "/article"', function () {

  it('Get Home (Page home)', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error");
          done(err);
        } else {
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
        if (err) {
          console.log("error");
          done(err);
        } else {
          // console.log(res);
          done();
        }
      })
  });

  it('Post Article // (create Article)', (done) => {
    request(app)
      .post('/article')
      .send({ title: 'Supertest' })
      .set('Accept', 'application/json')
      // .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done(err);
        } else {
          // console.log(res);
          done();
        }
      })
  });

  it("Post Article // (create Article with image)", (done) => {
    
    request(app)
      .post("/article")
      .field("Content-Type", "multipart/form-data")
      .field("title", "SuperTest")
      .attach("imgArticle", path.resolve(__dirname, "./licorn.jpg"))
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        done();
      });
  });

});