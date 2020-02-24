// Import
const User = require('../database/User')

module.exports = {
  deleteOne: async(req, res) => {
    const ListeUser = await User.find({})
    User.deleteOne({
        _id: req.params.id
      },
      (err) => {
        if (!err) {
          res.redirect('/')
        } else {
          res.send(err)
        }
      })
  }
}