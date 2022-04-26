const express = require('express')
const listController = require('../controllers/listController')
const {
     saveList, getLists, getOneList, 
     updateLists, updateBudget, deleteList,
     getBudget, saveBudget
    } = listController

const router = express.Router()

//post request of the list
router.post('/savelist/:id', saveList)

//get all lists
router.get('/getlist', getLists)

//get one list
router.get('/getonelist/:id', getOneList)

//update a list
router.put('/updatelist/:id', updateLists)

//delete a list
router.delete('/deletelist/:id', deleteList)



//budget route

router.post('/addbudget/:id', saveBudget)

router.put('/updatebudget/:id', updateBudget)

router.get('/getbudget/:id', getBudget)


module.exports = router