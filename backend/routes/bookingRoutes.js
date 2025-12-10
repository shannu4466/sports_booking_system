const express = require("express");
const router = express.Router();
const { authenticate,authorizeAdmin  } = require("../middleware/auth");

const bookingController = require("../controllers/bookingController");

router.post("/",authenticate, bookingController.createBooking);
router.get("/",authenticate, bookingController.getAllBookings);
router.get("/my", authenticate, bookingController.getMyBookings);
router.put("/cancel/:id",authenticate, bookingController.cancelBooking);
router.get("/", authenticate, authorizeAdmin, bookingController.getAllBookings);
router.post("/preview", authenticate, bookingController.previewPrice);

module.exports = router;
