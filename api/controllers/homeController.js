
/*
 * Controller
 *************/ 
module.exports = {
    get: (req, res) => {
        res.render('home')
    },
    post: (req, res) => {
        console.log('coucou');

    }
}