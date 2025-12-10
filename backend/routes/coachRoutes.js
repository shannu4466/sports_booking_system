const express = require("express");
const router = express.Router();
const controller = require("../controllers/coachController");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.post("/", authenticate, authorizeAdmin, controller.createCoach);
router.get("/", authenticate, controller.getAllCoaches);
router.put("/:id", authenticate, authorizeAdmin, controller.updateCoach);
router.delete("/:id", authenticate, authorizeAdmin, controller.deleteCoach);

module.exports = router;
