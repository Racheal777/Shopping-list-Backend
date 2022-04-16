//importing modules
const dbConfig = require('../config/db.config')

const {Sequelize, DataTypes} = require('sequelize')



//setting up the connection

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

//authenticating the connection to check if is connected
sequelize.authenticate().then(() => {
    console.log("Database connection is done")
}).catch((err) => {
    console.log(err)
})

//assigning the db variable to an empty object
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//requiring the models to sequelize it
db.users = require('./users') (sequelize, DataTypes)
db.lists = require('./todo') (sequelize, DataTypes)
db.budgets = require('./budget') (sequelize, DataTypes)


//syncing it so it will keep previous data
//force of sync is false so you dont loose your data if something happens
db.sequelize.sync({force: false}).then(() => {
    console.log('yes re-sync is done')
}).catch((err) => {
    console.log(err)
})

//establishing relationships
//We use hasMany() to help one User have many lists, 
//and belongsTo() to indicate that one list only belongs to one user.

db.users.hasMany(db.lists,{
    as: "list",
    foreignKey: "users_id"
})

db.lists.belongsTo(db.users, {
    as:  "user",
    foreignKey: "users_id"
})

db.budgets.belongsTo(db.lists, {
    as: "list",
    foreignKey: "list_id"
})

module.exports = db
