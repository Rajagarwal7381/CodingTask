const { NOW } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Reviews = sequelize.define(
    'reviews',
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tconst: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      averageRating: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      numVotes: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    },
    {
      //Ignoring ORM default fileds
      // We don't need createdAt
      createdAt: false,
      // We don't need updatedAt
      updatedAt: false
    }
  )

  return Reviews
}
