const express = require('express')
const router = express.Router()
const userController = require('../controllers/sessions')

//destroy the seesion when user click on 'logout' link 
router.get('/logout', userController.logout)


router.post('/', userController.login)

module.exports = router