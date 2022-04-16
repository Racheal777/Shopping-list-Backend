
const express = require('express')
const { Sequelize, where } = require('sequelize')

const db = require('../models')

//assigning a variable to the db list from the index file
const List = db.lists

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
    const newList = await List.create( data )
    res.status(201).json({ newList })
    console.log("saveList", JSON.stringify( newList, null, 2 ))

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





module.exports = {
    saveList,
    getListCategory,
    getLists,
    getOneList,
    updateLists,
    deleteList
}