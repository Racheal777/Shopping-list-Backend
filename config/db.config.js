



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