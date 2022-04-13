//requiring modules

const express = require('express')

const PORT = process.env.PORT || 7070


//assigning a variable to express
const app = express()



//listening to the server
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))