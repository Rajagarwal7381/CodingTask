const router = require('express').Router()
const reviews = require('../../controllers/reviews.controller')

// Create a new Order
router.post('/', reviews.create)

// Retrieve all Orders
router.get('/', reviews.findAll)

// Retrieve a single Order with id
router.get('/:id', reviews.findOne)

// Update a Order with id
router.put('/:id', reviews.update)

// Delete a Order with id
router.delete('/:id', reviews.delete)

// Delete all Orders
router.delete('/', reviews.deleteAll)

// update order status
//router.patch('/status', reviews.updateStatus)

module.exports = router
