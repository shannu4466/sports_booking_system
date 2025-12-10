const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Equipment = sequelize.define("Equipment", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Equipment;
