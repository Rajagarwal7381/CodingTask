var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(201).json(
    { status: true, message:  'Data is added successfully'})
});

const movies = require('./movies')
const reviews = require('./reviews')

router.use('/api',  movies)
router.use('/api', reviews)


module.exports = router;
