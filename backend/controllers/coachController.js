const Coach = require("../models/Coach");

exports.createCoach = async (req, res) => {
    const coach = await Coach.create(req.body);
    res.status(201).json(coach);
};

exports.getAllCoaches = async (req, res) => {
    const coaches = await Coach.findAll();
    res.json(coaches);
};

exports.updateCoach = async (req, res) => {
    await Coach.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ message: "Coach updated" });
};

exports.deleteCoach = async (req, res) => {
    await Coach.destroy({ where: { id: req.params.id } });
    res.json({ message: "Coach deleted" });
};
