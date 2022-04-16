//requiring modules

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { Sequelize } = require('sequelize')
const listRoute = require('./routes/listRoute')

const PORT = process.env.PORT || 7070


//assigning a variable to express
const app = express()

let corsOptions = {
    origin: "http://localhost:7070"
}
//middleware
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use( cors(corsOptions) )

//routes
app.use('/api/list', listRoute)



//listening to the server
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))