const express = require('express')
const { Sequelize, where } = require('sequelize')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.users
const Role = db.role
const budget = db.budgets
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const { config } = require('dotenv')

//signup
const signup = async (req, res) => {
//hashing password with bcrypt before it saves to the database
    
    //saving data to database
    const oneUser = await User.create({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
        
     }).then(user => {
        if(user){
            let token = jwt.sign({ id : user.id },config.secret, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })
            res.cookie('jwt', token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly:true})

            res.send({ message: "user registered" })
            console.log("registered user", JSON.stringify(user, null, 2))
            console.log(token)
        }

       else{
            //user role = 1
            res.send({message: "user not registered"})
        }
        
    }).catch((err) => {
        res.status(500).send({ message: err.message})
        console.log(err)
    })
}

//get one user with list and budget
const onePerson = async (req, res) => {
    try {
        const id = req.params.id
        const person = await User.findOne({
         where: {id: id},
         include: ['budget', "list"] })
         res.status(200).json({person})
         console.log("user", JSON.stringify(person, null, 2))

    } catch (error) {
        console.log(error)
        
    }
    

}

//login
const login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if(!user){
            res.status(401).json({message: "user not found"})
        }
        //else compare password
        let passwordmatched = bcrypt.compareSync(
            req.body.password, user.password
        )
        //if password dont match, send message invalid password
        if(!passwordmatched){
            res.status(401).json({
                message: "password invalid", 
                accessToken: null
            })
        }
        //else create token if password match
        let token = jwt.sign({ id : user.id },config.secret, {
            expiresIn: 1 * 24 * 60 * 60 * 1000
        })
        res.cookie('jwt', token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly:true})
        console.log(token)
        res.status(200).send({
            id: user.id,
            firstName: user.firstName
            
        })
        // console.log(firstName: user.firstName,
        //     lastName: user.lastName,
        //     username: user.username,
        //     email: user.email,
        //     password: user.password,
        //     accessToken: token)
    }).catch((err) => {
        res.status(500).send(err.json)
    })
    
}

const logout = (req, res) => {
    try {
        
        res.cookie('jwt','', {maxAge: 0 })
        res.status(200).send("logout successfully") 
        // console.log(token)  
    } catch (error) {
       console.log(error) 
    }
   
}

module.exports = {
    signup,
    onePerson,
    login,
    logout
}