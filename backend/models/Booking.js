const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Court = require("./Court");
const Coach = require("./Coach");
const User = require("./User");

const Booking = sequelize.define("Booking", {
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },

    equipment: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },

    totalPrice: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: "confirmed" },
    UserId: { type: DataTypes.INTEGER, allowNull: true }
});

Court.hasMany(Booking, { foreignKey: "CourtId" });
Booking.belongsTo(Court, { foreignKey: "CourtId" });

Coach.hasMany(Booking, { foreignKey: "CoachId" });
Booking.belongsTo(Coach, { foreignKey: "CoachId" });

User.hasMany(Booking, { foreignKey: "UserId" });
Booking.belongsTo(User, { foreignKey: "UserId" });

module.exports = Booking;
