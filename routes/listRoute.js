const express = require('express')
const listController = require('../controllers/listController')

const router = express.Router()

//post request of the list
router.post('/savelist', listController.saveList)


module.exports = router