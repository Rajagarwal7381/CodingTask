const db = require('../models')
//const Tutorial = db.tutorials
const Op = db.Sequelize.Op

// Create and Save a new Tutorial
exports.create = (req, res) => {
}

// Retrieve all movie from the database.
exports.findAll = (req, res) => {
}

// Find a single movie with an id
exports.findOne = (req, res) => {
  res.status(201).json(
    { status: true, message:  'Review is added successfully'})
}

// Update a movie by the id in the request
exports.update = (req, res) => {
}

// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
}

// Delete all movie from the database.
exports.deleteAll = (req, res) => {
}

// find all published movie
exports.findAllPublished = (req, res) => {
}
