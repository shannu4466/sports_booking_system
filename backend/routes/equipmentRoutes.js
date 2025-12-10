const express = require("express");
const router = express.Router();
const controller = require("../controllers/equipmentController");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.post("/", authenticate, authorizeAdmin, controller.createEquipment);
router.get("/", authenticate, authorizeAdmin, controller.getAllEquipment);
router.put("/:id", authenticate, authorizeAdmin, controller.updateEquipment);
router.delete("/:id", authenticate, authorizeAdmin, controller.deleteEquipment);
router.get("/available", authenticate, controller.getAvailableEquipment);

module.exports = router;
