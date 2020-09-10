/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')

// Création de notre Schéma (Comment)
const CommentSchema = new mongoose.Schema({
    author: String,
    message: String,
    isSuspend: Boolean,
    isVerified: {
        type: Boolean,
        default: false
    },
    date: String,
    articleID: String
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Comment', CommentSchema)