// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app, query } = require("../server"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", () => {
  let customer = {};

  // Loop for create Customer before 'it'
  beforeEach(async () => {
    let values = ["BRUNO", "Bru@nu.fr", "0606060606"];
    let sql = `INSERT INTO customers (name,email,mobile) values(?)`;
    const user = await query(sql, [values]);

    // console.log("Before EACH: ", user);
    // assert.ok(user.insertId);

    const userID = await query(
      `SELECT * FROM customers where id = ${user.insertId}`
    );
    
    customer = userID[0];
    userID[0].name.should.be.a("string");
    userID[0].email.should.be.a("string");
    userID[0].mobile.should.be.a("string");
  });

  // Exemple
  it("Exemple", (done) => {
    done();
  });

  // Test get /fev
  it(" ChaiRouter // Get Article", (done) => {
    // test route Get
    chai
      .request(app)
      .get("/api/v1/article")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test get /fev
  it(" ChaiRouter // Get ID Article", (done) => {
    // test route Get
    chai
      .request(app)
      .get(`/api/v1/article/${customer.id}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        // console.log(res.body)
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test Post
  // (name,email,mobile)
  it(" ChaiRouter // Post Article", (done) => {
    const body = {
      name: "Bruno Chai",
      email: "brchai@no.fr",
      mobile: "0909090909",
    };

    chai
      .request(app)
      .post("/api/v1/article")
      .set("Accept", "application/json")
      .send(body)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test Put /path:id
  // (name,email,mobile)
  it(" ChaiRouter // Put Article", (done) => {
    const body = {
      name: "Bruno Edit Chai",
      email: "brchai@no.fr",
      mobile: "0909090909",
    };

    // Test route Put
    chai
      .request(app)
      .put(`/api/v1/article/${customer.id}`)
      .set("Accept", "application/json")
      .send(body)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Delete ID
  it(" ChaiRouter // Delete ID Article", (done) => {
    // Test route Delete
    chai
      .request(app)
      .delete(`/api/v1/article/${customer.id}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Delete All
  it(" ChaiRouter // Delete Article", (done) => {
    // Test route Delete
    chai
      .request(app)
      .delete("/api/v1/article")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        done();
      });
  });
});
