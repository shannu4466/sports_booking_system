const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const courtRoutes = require("./routes/courtRoutes");
const coachRoutes = require("./routes/coachRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const pricingRuleRoutes = require("./routes/pricingRuleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/pricing-rules", pricingRuleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("Database Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
});
