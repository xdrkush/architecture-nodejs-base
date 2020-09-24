/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Import model
const Article = require('./Article')
const User = require('./Comment')

// Création de notre Shéma (Article)
const UserSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    // Ici nous creeons une relation avec le model Comment
    // C'est un tableau qui acceuillera les id des Article (String)
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    // Ici nous creeons une relation avec le model Comment
    // C'est un tableau qui acceuillera les id des Comment (String)
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('User', UserSchema)