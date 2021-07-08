/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {
  // Method Get
  get: async (req, res) => {
    // Variable de récupération de tout les customers
    let sql = `SELECT * FROM customers`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.json({
        status: 200,
        dbArticle: data,
        message: "Customers lists retrieved successfully",
      });
    });
  },
  // Method Get
  getID: async (req, res) => {
    // Variable de récupération de tout les customers
    let sql = `SELECT * FROM customers WHERE id = ${req.params.id}`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.json({
        status: 200,
        dbArticle: data,
        message: "Customers lists retrieved successfully",
      });
    });
  },
  // Method Post
  post: async (req, res) => {
    let sql = `INSERT INTO customers (name,email,mobile) values(?)`;
    let values = [req.body.name, req.body.email, req.body.mobile];
    db.query(sql, [values], function (err, data, fields) {
      if (err) throw err;
      let sql = `SELECT * FROM customers`;
      db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
          status: 200,
          dbArticle: data,
          message: "Add Customer successfully",
        });
      });
    });
  },
  // Method Post
  editOne: async (req, res) => {
    // SQL pour editer un users
    let sql = `UPDATE customers 
               SET name = '${req.body.name}',
                   mobile = '${req.body.mobile}',
                   email = '${req.body.email}'
               WHERE id = '${req.params.id}';`;

    await db.query(sql, function (err, edit, fields) {
      if (err) throw err;
      // SQL récupération de tout les users
      let sql = `SELECT * FROM customers`;
      db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
          status: 200,
          dbArticle: data,
          message: "Update Users successfully",
        });
      });
    });
  },
  // Method Delete One
  deleteOne: (req, res) => {
    let sql = `DELETE FROM customers  WHERE id = ?`;
    let values = [req.params.id];
    db.query(sql, [values], function (err, data, fields) {
      if (err) throw err;
      let sql = `SELECT * FROM customers`;
      db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
          status: 200,
          dbArticle: data,
          message: "Delete Customer successfully",
        });
      });
    });
  },
  // Method Delete All
  deleteAll: (req, res) => {
    let sql = `DELETE FROM customers`;
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      let sql = `SELECT * FROM customers`;
      db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
          status: 200,
          dbArticle: data,
          message: "Delete All Customer successfully",
        });
      });
    });
  },
};
