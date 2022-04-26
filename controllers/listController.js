
const express = require('express')
const { Sequelize, where } = require('sequelize')

const db = require('../models')

//assigning a variable to the db list from the index file
const List = db.lists
const Budget = db.budgets
const user = db.users


//saving a list to the database
const saveList = async ( req, res ) => {
try {
    let data = {
        list: req.body.list,
        price: req.body.price,
        quantity: req.body.quantity,
        status:  "Pending",
        userId: req.body.userId
    }
    const list = await List.create( data )
    res.status(201).json({ list })
    console.log("saveList", JSON.stringify( list, null, 2 ))

} catch (error) {
    console.log(error)
    
}
    
}

//get request
const getLists = async (req, res) => {
    try {
      
        const allLists = await List.findAll({})
    res.status(201).json({ allLists })
    console.log("ALLlIST", JSON.stringify(allLists, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}

//update list
const updateLists = async (req, res) => {
    try {

        const { status } = req.body;
            const data = {
                status,
            };
      
        let id = req.params.id
        const updatedLists = await List.update(data, {where: { id : id }})
    res.status(201).json({ updatedLists })

    console.log("UpdatedlIST", JSON.stringify(updatedLists, null, 2))
        console.log(data)
    } catch (error) {
        console.log(error)
        
    }
    
}


//getting one list
const getOneList = async (req, res) => {
    try {

        let id = req.params.id
        const oneList = await List.findOne({})

    res.status(201).json({ oneList })
    console.log("ALLlIST", JSON.stringify(oneList, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}




//deleting a list
//getting one list
const deleteList = async (req, res) => {
    try {

        let id = req.params.id
        const deletedList = await List.destroy({ where: { id : id }})
        
    res.status(201).json({ message: "item deleted successfully" })
    console.log("deleted lIST", JSON.stringify(deletedList, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}

//budget adding
const saveBudget = async ( req, res ) => {
    try {
        let info = {
            budget : req.body.budget,
            userId: req.body.userId
        }
        
        const newBudget = await Budget.create(info)
        res.status(201).json({ newBudget })
        console.log(info)
        console.log("saveBudget", JSON.stringify( newBudget, null, 2 ))
    
    } catch (error) {
        console.log(error)
        
    }
        
    }

    //getting the budget
    const getBudget = async (req, res) => {
        try {
          
            let id = req.params.id
            const oneBudget = await Budget.findOne({ where: { id: id }})
        res.status(201).json({ oneBudget })
        console.log("One Budget", JSON.stringify(oneBudget, null, 2))
    
        } catch (error) {
            console.log(error)
            
        }
        
    }
//update Budget
const updateBudget = async (req, res) => {
    try {

        const { budget } = req.body;
            const data = {
                budget,
            };
      
        let id = req.params.id
        const updatedBudget = await Budget.update(data, {where: { id : id }})
    res.status(201).json({ updatedBudget })

    console.log("Updated Budget", JSON.stringify(updatedBudget, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}
    



module.exports = {
    saveList,
    getLists,
    getOneList,
    updateLists,
    deleteList,
    saveBudget,
    updateBudget,
    getBudget
}