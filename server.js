/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    // Ici nous définissons notre nouveau layout
    // Que nous avons créé dans ./views/layouts/adminLayout 
    adminLayout: 'adminLayout'
}));

// Express static permet de diriger un chemin sur un dossier en particulier
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use('/assets', express.static('public'));

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)

// app.use((req, res) => {
//     res.render('err404')
// })

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});