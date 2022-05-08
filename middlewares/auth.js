//importing modules
const db = require('../models')
const ROLES = db.ROLES
const User = db.users
//checking if user exist 

const saveUser = async (req, res, next) => {
     User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then((user) => {
        if(user){
            res.status(409).json({message: "username is already in use!"})
            return
        }

        //checking if email exist
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if(user){
                res.status(400).json({message: "Authentication failed!"})
                return
            }
            next()
        })
        
    })
    
}

//checking if roles exist
//by looping through all the role to check if roles include what the user has
const checkRole = (req, res, next) => {
   if(req.body.roles){
       for(let i = 0; i < req.body.roles.length; i++){
           if(!ROLES.includes(req.body.roles[i])){
               res.status(400)
               .json({message: "Role does not exist = " + req.body.roles[i]})
               console.log(ROLES)
               return
           }
       }
   }
   next()
}

//placing all function in one variable for easy exporting
const verifySignup = {
    saveUser,
    checkRole

}

module.exports = verifySignup