const express = require('express'),
    router = express.Router(),
    homepage = require('./controllers/home')

// Home
router.route('/')
    .get(homepage.get)
    .post(homepage.post)

router.route('/article/add')
    // .get(articleAddController.get)
    // .post(articleAddController.post)

module.exports = router;