// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

//structuring the model
module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        list: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            default: "Pending"
        }

    }, {timestamps: true}, )

    return List
}