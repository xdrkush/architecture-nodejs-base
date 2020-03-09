/*
 *
 * Model de 'App'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')

// Define collection and schema for App item
const AppSchema = new mongoose.Schema({
  title: {
    type: String
  },
  hashtag: {
    type: String
  },
  category: {
    type: String
  },
  comment: {
    type: String
  },
  link: {
    type: String
  },
  description: {
    type: String
  },
  imgLogo: {
    type: String
  },
  imgPaysage: {
    type: String
  },
  author: {
    type: String
  },
  authorId: {
    type: String
  },
  like: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  suspend: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: new Date()
  }
}
)

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('App', AppSchema)