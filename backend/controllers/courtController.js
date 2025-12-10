const Court = require("../models/Court");

exports.createCourt = async (req, res) => {
    const court = await Court.create(req.body);
    res.status(201).json(court);
};

exports.getAllCourts = async (req, res) => {
    const courts = await Court.findAll();
    res.json(courts);
};

exports.getCourtById = async (req, res) => {
    const court = await Court.findByPk(req.params.id);
    res.json(court);
};

exports.updateCourt = async (req, res) => {
    await Court.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ message: "Court updated" });
};

exports.deleteCourt = async (req, res) => {
    await Court.destroy({ where: { id: req.params.id } });
    res.json({ message: "Court deleted" });
};
