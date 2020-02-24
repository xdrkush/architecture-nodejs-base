const User = require('../database/User')

module.exports = {
    get: async (req, res) => {
        const dbUser = await User.find({})
        console.log(dbUser);
        res.render('home', {
            dbUser
        })
    }
}