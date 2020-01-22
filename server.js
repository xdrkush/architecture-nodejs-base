/*
 * App.js
 ******************************/

//  Commit supprimer

const
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo'),
    bodyParser = require('body-parser'),
    a = "a",
    port = process.env.PORT || 3000;

//mongoose
const urlDb = 'mongodb://localhost:27017/apiRest'

mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongoStore = MongoStore(expressSession)

app.use(expressSession({

    secret: 'securite',
    name: 'ptiGato',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })

}));

//app.use
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

const ROUTER = require('./api/router')
app.use('/', ROUTER)

app.use((req, res) => {
    res.render('error404')
})

app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});