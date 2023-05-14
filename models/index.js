const dbConfig = require('../config/config')
const Sequelize = require('sequelize')


const sequelize = new Sequelize("taskdb", "postgres", "123", {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.movies = require('./movies.model')(sequelize, Sequelize)
db.reviews = require('./reviews.model')(sequelize, Sequelize)

db.movies.hasMany(db.reviews, { as: 'review', foreignKey: 'tconst' })
db.reviews.belongsTo(db.movies, { as: 'review', foreignKey: 'tconst' })

module.exports = db
