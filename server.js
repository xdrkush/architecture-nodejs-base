/*
 * App.js
 ******************************/

const
  express = require('express'),
  app = express(),
  hbs = require('express-handlebars'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  multer = require('multer'),
  fs = require('fs'),
  path = require('path'),
  port = process.env.PORT || 3000;

// Method-Override
app.use(methodOverride('_method'))

// Mongoose
const urlDb = 'mongodb://localhost:27017/apiRest'

mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const mongoStore = MongoStore(expressSession)

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

// express-static
app.use('/assets', express.static('public'));
// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ROUTER = require('./api/router')
app.use('/', ROUTER)

app.use((req, res) => {
  res.render('err404')
})

app.listen(port, () => {
  console.log("le serveur tourne sur le prt: " + port);
});