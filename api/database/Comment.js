/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

// Import model
const Article = require('./Article')
const User    = require('./User')

// Création de notre Schéma (Comment)
const CommentSchema = new mongoose.Schema({
    author: {
        type: String
    },
    authorID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    articleID: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Comment', CommentSchema)