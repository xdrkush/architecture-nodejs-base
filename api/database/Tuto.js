/*
 *
 * Model de 'Tuto'
 ******************************/

const mongoose = require('mongoose')

// Define collection and schema for App item
const TutoSchema = new mongoose.Schema({
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

const Tuto = mongoose.model('Tuto', TutoSchema)

module.exports = Tuto