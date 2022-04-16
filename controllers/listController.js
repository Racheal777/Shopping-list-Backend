
const express = require('express')
const { Sequelize } = require('sequelize')

const db = require('../models')

//assigning a variable to the db list from the index file
const List = db.lists

//saving a list to the database
const saveList = async ( req, res ) => {

    let data = {
        list: req.body.list,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        status: req.body.status ? req.body.status : "Pending"
    }
    const newList = await List.create(data)
    res.status(201).json({newList})
    console.log("saveProduct", JSON.stringify(newList, null, 2))
}




module.exports = {
    saveList,
}