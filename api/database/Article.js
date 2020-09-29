/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const format = require('date-format')

// Création de notre Shéma (Model)
// c'est le Model de (Model)
const ArticleSchema = new mongoose.Schema({
    // Première variable (basique)
    title: String,
    price: String,
    isSuspend: Boolean,
    description: String,
    imgArticle: String,
    imgDescr: String,
    promo: Number,
    taille: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    created: {
        type: String
    },
    articleID: Number
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Article', ArticleSchema)