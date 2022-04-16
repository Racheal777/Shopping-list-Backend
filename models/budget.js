
//structuring the model
module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('budget', {
        
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        

    }, {timestamps: true}, )

    return Budget
}