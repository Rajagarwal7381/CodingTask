const router = require('express').Router()

const reviews = require('./reviews.routes')


router.use('/review/', reviews)

module.exports = router
