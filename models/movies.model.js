const { NOW } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Movies = sequelize.define(
        'movies',
        {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
              //  primaryKey: true,
                autoIncrement: true
            },
            tconst: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull:false
            },
            titleType: {
                type: Sequelize.STRING,
            },
            primaryTitle: {
                type: Sequelize.STRING,
            },
            runtimeMinutes: {
                type: Sequelize.BIGINT,
                allowNull:false
            },
            genres: {
                type: Sequelize.STRING,
                allowNull:false
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

    return Movies
}
