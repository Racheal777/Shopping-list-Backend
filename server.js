//requiring modules

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { Sequelize } = require('sequelize')
const listRoute = require('./routes/listRoute')
const db = require('./models/index')
const Role = db.roles

const PORT = process.env.PORT || 7070


//assigning a variable to express
const app = express()

let corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, OPTIONS, PUT, DELETE",
}
//middleware
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use( cors(corsOptions) )

//routes
app.use('/api/list', listRoute)

//syncing it so it will keep previous data
//force of sync is false so you dont loose your data if something happens
db.sequelize.sync({force: false}).then(() => {
    console.log('yes re-sync is done')
    // initial()
}).catch((err) => {
    console.log(err)
})

//instantiating the roles with their id
//initial() function helps us to create 3 rows in database.
// function initial() {
   
//     Role.create({
//         id: 2,
//         name: "user"
//     })

//     Role.create({
//         id: 3,
//         name: "admin"
//     })
    
// }

//listening to the server
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))