const express = require("express");
const router = express.Router();
const controller = require("../controllers/courtController");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.post("/", authenticate, authenticate, authorizeAdmin, controller.createCourt);
router.get("/", authenticate, controller.getAllCourts);
router.get("/:id", authenticate, controller.getCourtById);
router.put("/:id", authenticate, controller.updateCourt);
router.delete("/:id", authenticate, authorizeAdmin, controller.deleteCourt);

module.exports = router;
