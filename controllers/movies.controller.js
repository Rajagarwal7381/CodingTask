const { where } = require('sequelize')
const db = require('../models')



const Movies = db.movies
const Reviews = db.reviews
const Op = db.Sequelize.Op
const csvToJson = require('csvtojson')


exports.create = (req, res) => {
  if (req.body == null || undefined) {
    return res.status(400).json({ status: false + "Content can not be empty!" })
  }

  const movie = {
    tconst: req.body.tconst || null,
    titleType: req.body.titleType || null,
    primaryTitle: req.body.primaryTitle || null,
    runtimeMinutes: req.body.runtimeMinutes || null,
    genres: req.body.genres || null
  }

  let review = null
  if (req.body.averageRating && req.body.primaryTitle != null && req.body.numVotes != null) {
    review = {
      tconst: req.body.tconst || null,
      averageRating: req.body.averageRating || null,
      primaryTitle: req.body.primaryTitle || null,
      numVotes: req.body.numVotes || null,
    }
  }

  Movies.create(movie)
    .then((data) => {
      if (review != null) {
        Reviews.create(review)
          .then((data) => {
            return res.status(201).json({ status: true, msg: "Data added succesfully" })
          })
          .catch((err) => {
            return res.status(400).json({ status: false, msg: "Content can not be empty or invalid!" + err })
          })
      } else {
        return res.status(201).json({ status: true, msg: "Data added succesfully" })
      }
    })
    .catch((err) => {
      return res.status(400).json({ status: false, msg: "Content can not be empty or invalid!" + err })
    })
}

exports.longestDurationMovies = (req, res) => {
  let limit = 10
  let sortData = []
  sortData.push(['runtimeMinutes', 'DESC'])
  Movies.findAll(
    {
      limit,
      order: sortData
    }
  ).then(data => {
    return res.status(201).json({ status: true, data })
  }).catch(err => {
    console.log("err is " + err)
    return res.status(500).json({ status: true, message: 'err is' + err })
  })

}

exports.topRatedMovies = (req, res) => {
  Movies.findAll(
    {
      raw: true,
      subQuery: false,
      attributes: ['tconst', 'tconst', 'titleType', 'primaryTitle', 'runtimeMinutes', 'genres',
        [db.Sequelize.col('review.averageRating'), 'averageRating']],
      include: {
        as: 'review',
        model: Reviews,
        attributes: [],
        where: {
          averageRating: {
            [Op.gte]: 6,
          }
        }
      }
    }
  ).then(data => {
    return res.status(201).json({ status: true, data })
  }).catch(err => {
    console.log("err is " + err)
    return res.status(500).json({ status: true, message: 'err is' + err })
  })
}

exports.updateRuntimeMinutes = (req, res) => {
  const sqlQry = `UPDATE "movies"
  SET "runtimeMinutes" = CASE 
    WHEN "genres" = 'Documentary'
    THEN "runtimeMinutes" + 15
    WHEN "genres" = 'Animation'
    THEN "runtimeMinutes" + 30
    ELSE "runtimeMinutes" + 45
  END`
  try {
    db.sequelize.query(sqlQry)
    return res.status(201).json({ status: true, msg: "updated succesfully" })
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Can't updated " + err.msg })
  }
}

exports.genreMoviesWithSubTotals = async (req, res) => {

  let sortData = []
  sortData.push(['genres', 'ASC'])
  Movies.findAll(
    {
      raw: true,
      subQuery: false,
      order: sortData,
      group: ['genres'],
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.col('numVotes')), 'TOTAL'], 'genres',
      ],
      include: {
        as: 'review',
        model: Reviews,
        attributes: []
      }
    }
  ).then(data => {
    return res.status(201).json({ status: true, data })
  }).catch(err => {
    console.log("err is " + err)
    return res.status(500).json({ status: true, message: 'err is' + err })
  })


  // Second way i have tried 
  // const sqlQry = ' SELECT sum("numVotes") AS "TOTAL", "movies"."genres" FROM "movies" AS "movies" LEFT OUTER JOIN "reviews" AS "review" ON "movies"."tconst" = "review"."tconst" GROUP BY "genres" ORDER BY "movies"."genres" ASC'
  // try {
  //   data =await db.sequelize.query(sqlQry)
  //   console.log("darta "+JSON.stringify(data))
  //   return res.status(201).json({ status: true, msg:data })
  // } catch (err) {
  //   return res.status(500).json({ status: false, msg: "Can't updated " + err.msg })
  // }
}

