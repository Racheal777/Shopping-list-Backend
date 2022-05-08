const dotenv = require('dotenv').config()



//grabbing the values for the database

module.exports = {
    HOST : "localhost",
    USER: "root",
    PASSWORD: '',
    DB: "shoppingList",
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

// module.exports = {
//     HOST : process.env.host,
//     USER: process.env.username,
//     PASSWORD: process.env.password,
//     DB: process.env.database,
//     dialect: "mysql",

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }