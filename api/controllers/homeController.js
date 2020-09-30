/*
 * Controller
 *************/ 
var format = require('date-format')

module.exports = {
    // Method Get
    get: (req, res) => {
        // on envoie la date travailler coté back-end sur le front
        const date = format.asString('le dd/MM/yyyy à hh:mm:ss', new Date());
        res.render('home', {
            date: date
        })
    }
}