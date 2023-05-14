const router = require('express').Router()

const movies = require('./movies.routes')


router.use('/v1/', movies)


module.exports = router
