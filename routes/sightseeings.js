const express = require('express')
const router = express.Router()
const sightseeingController = require('../controllers/sightseeings')

router.post('/', sightseeingController.create)

router.delete('/:id',sightseeingController.deleteSight )

module.exports = router