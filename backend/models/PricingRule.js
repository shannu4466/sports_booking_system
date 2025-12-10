const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PricingRule = sequelize.define("PricingRule", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    startHour: DataTypes.INTEGER,
    endHour: DataTypes.INTEGER,
    multiplier: DataTypes.FLOAT,
    surcharge: DataTypes.INTEGER
});

module.exports = PricingRule;
