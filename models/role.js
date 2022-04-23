// const { DataTypes } = require("sequelize/types");
// const { Sequelize } = require(".");

module.exports = (Sequelize, DataTypes) => {
    const Role = Sequelize.define('role', {
        id : {
            type: DataTypes.STRING,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,

        }
    })

    return Role
}