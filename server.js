/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const express = require("express"),
  app = express(),
  hbs = require("express-handlebars"),
  expressSession = require("express-session"),
  mysql = require("mysql"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  port = process.env.PORT || 4000,
  morgan = require("morgan");

var MySQLStore = require("express-mysql-session")(expressSession);

// Morgan
app.use(morgan("dev"));

// Method-Override
app.use(methodOverride("_method"));

let configDB = {
  host: "localhost",
  user: "tuto",
  password: "tuto$",
  database: "crud_tutorial",
};

// Mysql
db = mysql.createConnection(configDB);

db.connect((err) => {
  if (err) console.error("error connecting: " + err.stack);
  console.log("connected as id " + db.threadId);
});

// Handlebars
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
  })
);

var sessionStore = new MySQLStore(configDB);

// Express-session
app.use(
  expressSession({
    secret: "securite",
    name: "ptiGato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);

// Express Static (Permet de pointer un dossier static sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use("/assets", express.static("public"));

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Router
const ROUTER = require("./api/router");
app.use(ROUTER);

// app.use((req, res) => {
//     res.render('err404')
// })

// Lancement de l'application
app.listen(port, () => {
  console.log("le serveur tourne sur le prt: " + port);
});
