const express = require('express')
const userController = require('../controllers/userController')
const { signup, onePerson, login, logout } = userController
const verifySignup = require('../middlewares')
// const {checkSignup} = verifySignup.verifySignup

const router = express.Router()

//post request of the user
router.post('/signup', verifySignup.verifySignup.saveUser , signup)

router.post('/login', login)

//logout
router.get('/logout', logout)


//get all lists
router.get('/oneuser/:id', onePerson )

module.exports = router