/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')

// Création de notre Shéma (Model)
// c'est le Model de (Model)
const CommentSchema = new mongoose.Schema({
    // Première variable (basique)
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