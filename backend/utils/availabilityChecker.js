const Booking = require("../models/Booking");
const { Op } = require("sequelize");

// Court avail checking
async function isCourtAvailable(courtId, startTime, endTime) {
    const conflict = await Booking.findOne({
        where: {
            CourtId: courtId,
            status: "confirmed",

            // OVERLAP LOGIC
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime }
        }
    });

    return !conflict;
}


// Coach avai checking
async function isCoachAvailable(coachId, startTime, endTime) {
    if (!coachId) return true;

    const conflict = await Booking.findOne({
        where: {
            CoachId: coachId,
            status: "confirmed",
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime }
        }
    });

    return !conflict;
}

// Equpiment avail checking
const Equipment = require("../models/Equipment");

async function isEquipmentAvailable(racketsRequested, shoesRequested) {
    const rackets = await Equipment.findOne({ where: { name: "Racket" } });
    const shoes = await Equipment.findOne({ where: { name: "Shoe" } });

    if (racketsRequested > rackets.totalStock) return false;
    if (shoesRequested > shoes.totalStock) return false;

    return true;
}


module.exports = {
    isCourtAvailable,
    isCoachAvailable,
    isEquipmentAvailable
};
