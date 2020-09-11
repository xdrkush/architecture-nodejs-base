
module.exports = {
    get: (req, res) => {
        res.render('admin', {
            // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
            layout: 'adminLayout'
        })
    }
}