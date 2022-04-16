
const express = require('express')
const { Sequelize, where } = require('sequelize')

const db = require('../models')

//assigning a variable to the db list from the index file
const List = db.lists
const Budget = db.budgets

//saving a list to the database
const saveList = async ( req, res ) => {
try {
    let data = {
        list: req.body.list,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        status: req.body.status ? req.body.status : "Pending"
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
      
        const allLists = await List.findAll({
            include: ['budget']
        })
    res.status(201).json({ allLists })
    console.log("ALLlIST", JSON.stringify(allLists, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}

//update list
const updateLists = async (req, res) => {
    try {

        let info = {
            status: 'Done'
        }
      
        let id = req.params.id
        const updatedLists = await List.update(info, {where: { id : id }})
    res.status(201).json({ updatedLists })

    console.log("UpdatedlIST", JSON.stringify(updatedLists, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}


//getting one list
const getOneList = async (req, res) => {
    try {

        let id = req.params.id
        const oneList = await List.findOne({where: {id : id}})

    res.status(201).json({ oneList })
    console.log("ALLlIST", JSON.stringify(oneList, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}

//getting one list
//not done
const getListCategory = async (req, res) => {
    try {

        let category = req.body.category
        const categoryList = await List.findAll({
            attributes : []
        })
        
    res.status(201).json({ categoryList })
    console.log("Category lIST", JSON.stringify(categoryList, null, 2))

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
        let data = req.body
        const newBudget = await Budget.create(data)
        res.status(201).json({ newBudget })
        console.log(data)
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

        let info = {
            amount: req.body.amount,
        }
      
        let id = req.params.id
        const updatedBudget = await Budget.update(info, {where: { id : id }})
    res.status(201).json({ updatedBudget })

    console.log("Updated Budget", JSON.stringify(updatedBudget, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    
}
    



module.exports = {
    saveList,
    getListCategory,
    getLists,
    getOneList,
    updateLists,
    deleteList,
    saveBudget,
    updateBudget,
    getBudget
}