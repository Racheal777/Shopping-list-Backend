//importing modules

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const { role } = require('../models')
const db = require('../models')
const User = db.users


//verify token
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    //if token does not exist,
    if(!token){
        res.status(400).json({message: "token not provided"})
    }

    //verify token with jwt
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            console.log(err)
            res.status(401).json({message: "unauthorized"})
        }
        req.userId = decoded.id
        next()
    })
}

//checking if admin roles are assigned
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next()
                    return
                }
            }
        })
    })
}

//checking if its a moderator
const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "moderator"){
                    next()
                    return
                }
            }
        })
    })
}

const isModeratororisAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "moderator"){
                    next()
                    return
                }
                if(roles[i].name === "admin"){
                    next()
                    return
                }
            }
            res.status(403).json({message: "require admin or moderator"})
        })
    })
}

//assigning all functions to one variable
const authJwt = {
    isAdmin,
    isModerator,
    isModeratororisAdmin,
    verifyToken
}

module.exports = authJwt