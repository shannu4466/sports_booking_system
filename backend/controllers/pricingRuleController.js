const PricingRule = require("../models/PricingRule");

exports.createRule = async (req, res) => {
    const rule = await PricingRule.create(req.body);
    res.status(201).json(rule);
};

exports.getRules = async (req, res) => {
    res.json(await PricingRule.findAll());
};

exports.deleteRule = async (req, res) => {
    await PricingRule.destroy({ where: { id: req.params.id } });
    res.json({ message: "Rule deleted" });
};
