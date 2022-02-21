/*
 *
 * Model de 'Article'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')

// Création de notre Shéma (Model)
// c'est le Model de (Model)
const TestSchema = new mongoose.Schema({
    // Première variable (basique)
    title: String,
    price: String
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Test', TestSchema)