const express = require('express')
const router = express.Router()
const tripController = require('../controllers/trips')

//NEW ROUTE - send the user to the new fruit form page
router.get('/new', tripController.newOne)

//CREATE ROUTE - will create a new fruit with data from the form
router.post('/', tripController.createTrip)

//INDEX ROUTE - send all fruits in the response
router.get('/', tripController.index)

//SHOW ROUTE - send a single fruit in the response
router.get('/:id', tripController.show)

//DELETE ROUTE - remove a single fruit from the array and redirect the user to index
router.delete('/:id', tripController.removeTrip)


module.exports = router