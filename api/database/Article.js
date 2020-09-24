/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

// Import model
const Comment = require('./Comment')
const User    = require('./User')

// Création de notre Shéma (Article)
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    // Ici nous creeons une relation avec le model Comment
    // C'est un tableau qui acceuillera les id des comment (String)
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        type: String
    },
    // Ici nous creeons une relation avec le model User
    // C'est un tableau qui acceuillera les id des User (String)
    authorID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Article', ArticleSchema)