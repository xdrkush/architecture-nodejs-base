
/*
 * Controller
 *************/ 
module.exports = {
    get: (req, res) => {
        res.render('contact')
    },
    post: (req, res) => {
        console.log('coucou');

    }
}