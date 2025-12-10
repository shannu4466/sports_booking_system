const Equipment = require("../models/Equipment");

exports.createEquipment = async (req, res) => {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
};

exports.getAllEquipment = async (req, res) => {
    res.json(await Equipment.findAll());
};

exports.updateEquipment = async (req, res) => {
    await Equipment.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ message: "Equipment updated" });
};

exports.deleteEquipment = async (req, res) => {
    await Equipment.destroy({ where: { id: req.params.id } });
    res.json({ message: "Equipment deleted" });
};

exports.getAvailableEquipment = async (req, res) => {
    const data = await Equipment.findAll();

    const formatted = data.map(item => ({
        id: item.id,
        name: item.name,
        stock: item.totalStock,
        price: item.price
    }));

    res.json(formatted);
};
