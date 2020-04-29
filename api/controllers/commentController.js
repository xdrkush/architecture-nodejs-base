// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Comment = require('../database/Comment')

module.exports = {
    post: async(req, res) => {
        console.log(req.body)
        Comment.create({
                ...req.body
            },
            res.redirect('/article')
        )
    }
}