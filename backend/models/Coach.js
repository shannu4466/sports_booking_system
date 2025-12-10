const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coach = sequelize.define("Coach", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Coach;
