const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_SECRET";
const JWT_EXP = "8h";

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) return res.status(400).json({ message: "Missing fields" });

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "Email already registered" });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash, role: "user" });

        res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXP });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
