const router = require('express').Router()
const movies = require('../../controllers/movies.controller')

router.post('/new-movie', movies.create)

router.get('/longest-duration-movies', movies.longestDurationMovies)

router.get('/top-rated-movies', movies.topRatedMovies)

router.get('/genre-movies-with-subtotals', movies.genreMoviesWithSubTotals)

router.post('/update-runtime-minutes', movies.updateRuntimeMinutes)



module.exports = router
