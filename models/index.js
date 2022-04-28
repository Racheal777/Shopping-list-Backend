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
db.role = require('./role') (sequelize, DataTypes)


//establishing relationships
//We use hasMany() to help one User have many lists, 
//and belongsTo() to indicate that one list only belongs to one user.

db.users.hasMany(db.lists,{
    as: "list",
    foreignKey: "userId"
})

db.lists.belongsTo(db.users, {
    as:  "user",
    foreignKey: "userId"
})

db.users.hasOne(db.budgets, {
    as: "budget",
    foreignKey: "userId"
})

db.budgets.belongsTo(db.users, {
    as: "user",
    foreignKey: "userId"
})

//indicating the relationship of many to many between user and role
//With through, foreignKey, otherKey, we’re gonna have a new table user_roles
// as connection between users and roles table via their primary key as foreign keys.

// db.role.belongsToMany(db.users, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// })


// db.users.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// })

//declaring the roles a user can have
// db.ROLES = ["user", "admin", "moderator"]


module.exports = db
