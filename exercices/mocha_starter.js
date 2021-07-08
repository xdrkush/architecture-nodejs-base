var assert = require("assert");
const { db } = require("../server"); // import to server.js

describe("MOCHA // CRUD // Customer", () => {
  let customer = {};
  let id = 0;

  // Loop for create Customer before 'it'
  beforeEach((done) => {
    let values = ["BRUNO", "Bru@nu.fr", "0606060606"];
    let sql = `INSERT INTO customers (name,email,mobile) values(?)`;

    db.query(sql, [values], function (err, data, fields) {
      if (err) throw err;
      customer.id = data.insertId;
      // console.log(typeof data.insertId)
      assert(data.insertId)
      done()
    });
  });

  // Test
  it("TEST // Customer", (done) => {
    // console.log("TEST: ", id)
    done();
  });

  // Create Customer
  it("POST // Customer", (done) => {
    let values = ["BRUNO", "Bru@nu.fr", "0606060606"];
    let sql = `INSERT INTO customers (name,email,mobile) values(?)`;

    db.query(sql, [values], function (err, data) {
      if (err) throw err;
      // console.log("POST: ", data);
      assert(data)
      done();
    });
  });

  // // Get ALL Customer
  // it("GET ALL // Customer", (done) => {
  //   let sql = `SELECT * FROM customers`;
  //   db.query(sql, (data, err) => {
  //     if (err) console.log(err);
  //     // console.log(data)
  //     // assert(data)
  //     done();
  //   });
  // });

  // Get ID Customer
  it("GET ID // Customer", (done) => {
    // console.log("GETID: ", customer.id);
    let values = ["BRUNO", "Bru@nu.fr", "0606060606"];
    // Récupère l'id du post au dessus
    let sql = `SELECT * FROM customers WHERE id = ${customer.id}`;

    db.query(sql, function (err, data) {
      if (err) throw err;
      // console.log("GET ID: ", data);
      assert(data)
      done();
    });
  });

  // Edit Customers
  it("PUT ID // Customer", (done) => {
    // console.log("EDITT: ", customer);
    let sql = `UPDATE customers
                 SET name   = 'Test Edit',
                     mobile = 'Test Edit',
                     email  = '0909090909'
                 WHERE  id  = '${ id }';`;

    db.query(sql, function (err, data) {
      if (err) throw err;
      // console.log('PUT: ', data)
      assert(data)
      done();
    });
  });

  // Delete ID
  it("DELETE ID // Customer", (done) => {
    let sql = `DELETE FROM customers WHERE id = ${ id }`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      // console.log('DELETE ID: ', data)
      assert(data)
      done();
    });
  });

  // à décommenter pour tout supprimer
  // Delete ALL
  it("DELETE ALL // Customer", (done) => {
    let sql = `DELETE FROM customers`;
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      // console.log('DELETE ID: ', data)
      assert(data)
      done();
    });
  });
});
