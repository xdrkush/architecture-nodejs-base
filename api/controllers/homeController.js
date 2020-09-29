/*
 * Controller
 *************/ 
var format = require('date-format')

module.exports = {
    // Method Get
    get: (req, res) => {
        const date = format.asString('hh:mm:ss.yyyy', new Date());
        res.render('home', {
            date: date
        })
    }
}