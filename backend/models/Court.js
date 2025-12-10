const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Court = sequelize.define("Court", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("indoor", "outdoor"),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Court;
