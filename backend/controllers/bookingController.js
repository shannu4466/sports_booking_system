const Booking = require("../models/Booking");
const PricingRule = require("../models/PricingRule");
const User = require("../models/User");
const Coach = require("../models/Coach");
const Court = require("../models/Court");
const Equipment = require("../models/Equipment");

const {
    isCourtAvailable,
    isCoachAvailable,
    isEquipmentAvailable
} = require("../utils/availabilityChecker");

const calculateTotal = require("../utils/priceCalculator");

exports.createBooking = async (req, res) => {
    try {
        const { courtId, coachId, startTime, endTime, equipment = [] } = req.body;

        const courtFree = await isCourtAvailable(courtId, startTime, endTime);
        if (!courtFree) return res.status(400).json({ message: "Court is already booked!" });

        const coachFree = await isCoachAvailable(coachId, startTime, endTime);
        if (!coachFree) return res.status(400).json({ message: "Coach is not available!" });

        const equipmentFromDb = await Equipment.findAll();

        for (const item of equipment) {
            const qty = Number(item.quantity) || 0;
            const dbItem = equipmentFromDb.find(e => Number(e.id) === Number(item.id));
            if (!dbItem || qty > Number(dbItem.totalStock)) {
                return res.status(400).json({ message: "Equipment not available!" });
            }
        }

        const court = await Court.findByPk(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const BASE_PRICE = Number(court.price);
        const rules = await PricingRule.findAll();
        const priceResult = calculateTotal(BASE_PRICE, rules, startTime, endTime);
        let totalPrice = Number(priceResult.total) || 0;

        let equipmentFee = 0;
        for (const item of equipment) {
            const qty = Number(item.quantity) || 0;
            if (qty <= 0) continue;
            const dbItem = equipmentFromDb.find(e => Number(e.id) === Number(item.id));
            const pricePerUnit = Number(dbItem?.price) || 0;
            equipmentFee += qty * pricePerUnit;
        }

        let coachFee = 0;
        if (coachId) {
            const coach = await Coach.findByPk(coachId);
            if (!coach) return res.status(404).json({ message: "Coach not found" });
            coachFee = Number(coach.price) || 0;
        }

        totalPrice = totalPrice + equipmentFee + coachFee;

        const booking = await Booking.create({
            UserId: req.user.id,
            CourtId: courtId,
            CoachId: coachId || null,
            startTime,
            endTime,
            equipment,
            totalPrice,
            status: "confirmed"
        });

        res.status(201).json({
            id: booking.id,
            status: booking.status,
            totalPrice,
            equipment
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { UserId: req.user.id },
            include: [
                { model: Coach, attributes: ["id", "name"] },
                { model: Court, attributes: ["id", "name"] }
            ]
        });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Coach, attributes: ["id", "name"] },
                { model: Court, attributes: ["id", "name"] }
            ]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.update({ status: "cancelled" }, { where: { id } });
        res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.previewPrice = async (req, res) => {
    try {
        const { courtId, startTime, endTime, coachId, equipment = [] } = req.body;

        if (!startTime) {
            return res.status(400).json({ message: "startTime are required" });
        }

        if (!courtId) {
            return res.status(400).json({ message: "courtId are required" });
        }

        const court = await Court.findByPk(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const BASE_PRICE = Number(court.price);
        const rules = await PricingRule.findAll();
        const priceResult = calculateTotal(BASE_PRICE, rules, startTime, endTime);
        let total = Number(priceResult.total) || 0;

        const equipmentFromDb = await Equipment.findAll();

        let equipmentFee = 0;
        for (const item of equipment) {
            const qty = Number(item.quantity) || 0;
            if (qty <= 0) continue;

            const dbItem = equipmentFromDb.find(e => Number(e.id) === Number(item.id));
            const pricePerUnit = Number(dbItem?.price) || 0;

            equipmentFee += qty * pricePerUnit;
        }

        let coachFee = 0;
        if (coachId) {
            const coach = await Coach.findByPk(coachId);
            if (!coach) return res.status(404).json({ message: "Coach not found" });
            coachFee = Number(coach.price) || 0;
        }

        total = total + equipmentFee + coachFee;

        res.json({
            basePrice: BASE_PRICE,
            ruleAdjustedPrice: priceResult.total,
            equipmentFee,
            coachFee,
            total
        });

    } catch (error) {
        console.error("PREVIEW ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
