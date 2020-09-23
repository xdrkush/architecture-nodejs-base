/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Import model
const Article  = require('./Article')
const User     = require('./Comment')

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
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('User', UserSchema)