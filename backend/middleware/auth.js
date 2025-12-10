const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        // optionally fetch user
        const user = await User.findByPk(payload.userId);
        if (!user) return res.status(401).json({ message: "Invalid token user" });

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.authorizeAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    next();
};
