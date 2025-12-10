const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "sports_booking",
    "root",
    "root",
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;
