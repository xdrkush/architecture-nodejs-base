/*
 * App.js
 ******************************/

const
    express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express(),
    hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 3000,
    // swaggerUi = require('swagger-ui-express'),
    // expressOasGenerator = require('express-oas-generator'),
    // swaggerDocument = require('./api/config/swagger.json'),
    morgan = require('morgan');

// Morgan
app.use(morgan('dev'))

app.use(cookieParser())

// OAS generator express ( doc api )
// expressOasGenerator.init(app, {});

// Method-Override
app.use(methodOverride('_method'))

// Mongoose
const urlDb = 'mongodb://localhost:27017/apiRest'

mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

const mongoStore = MongoStore(expressSession)

// Express-session
app.use(expressSession({
    secret: 'securite',
    name: 'Session',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use('*', (req, res, next) => {
    console.log('Cookie')
    next()
})



//app.use
app.use('/assets', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const ROUTER = require('./api/router')
app.use('/', ROUTER)

// app.use((req, res) => {
//     res.render('err404')
// })

app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});