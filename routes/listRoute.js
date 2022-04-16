const express = require('express')
const listController = require('../controllers/listController')

const router = express.Router()

//post request of the list
router.post('/savelist', listController.saveList)

//get all lists
router.get('/getlist', listController.getLists)

//get one list
router.get('/getonelist/:id', listController.getOneList)

//update a list
router.put('/updatelist/:id', listController.updateLists)

//delete a list
router.delete('/deletelist/:id', listController.deleteList)

//get list by category
router.get('/category/:id', listController.getListCategory)


module.exports = router