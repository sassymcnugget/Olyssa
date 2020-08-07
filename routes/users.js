const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//destroy the seesion when user clicks on 'logout' link 
router.get('/logout', userController.logout)

router.get('/signup', userController.newUser)

router.post('/signup', userController.createUser)

router.post('/login', userController.login)

module.exports = router 