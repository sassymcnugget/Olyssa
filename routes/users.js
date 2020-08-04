const express = require('express')
const router = express.Router()
const userController = require('../controllers/sessions')

router.post('/', userController.login)



module.exports = router