/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
  express = require('express'),
  app = express(),
  hbs = require('express-handlebars'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  port = process.env.PORT || 3000;

// Method-Override
app.use(methodOverride('_method'))

// Mongoose
// Ceci est un tuto sinon vous devez cacher cette information de la ligne juste en dessous
const urlDb = 'mongodb://localhost:27017/apiRest'
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// save session avec MongoDB
const mongoStore = MongoStore(expressSession)

// express-static
app.use('/assets', express.static('public'));
// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}));

// Express-session
app.use(expressSession({

  secret: 'securite',
  name: 'ptiGato',
  saveUninitialized: true,
  resave: false,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })

}));

const ROUTER = require('./api/router')
app.use('/', ROUTER)

app.use((req, res) => {
  res.render('err404')
})

// Lancement de l'application
app.listen(port, () => {
  console.log("le serveur tourne sur le prt: " + port);
});