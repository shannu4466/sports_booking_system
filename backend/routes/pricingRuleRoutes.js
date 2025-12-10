const express = require("express");
const router = express.Router();
const controller = require("../controllers/pricingRuleController");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.post("/", authenticate, authorizeAdmin, controller.createRule);
router.get("/", authenticate, authorizeAdmin, controller.getRules);
router.delete("/:id", authenticate, authorizeAdmin, controller.deleteRule);

module.exports = router;
