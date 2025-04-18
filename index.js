// functions/api.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const winston = require('winston');
const serverless = require('serverless-http');

dotenv.config();

const app = express();

// Configure winston for logging
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

// Middleware to parse JSON data and handle CORS
app.use(cors({
    origin: 'https://wander-lust-123456.netlify.app', // Replace with your Netlify frontend URL
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type',
}));
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => {
        logger.error("❌ MongoDB connection error:", err);
        process.exit(1); // Exit the process if DB connection fails
    });

// Define UserLogin schema and model
const UserLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "UserLogin" });

const UserLogin = mongoose.models.UserLogin || mongoose.model("UserLogin", UserLoginSchema);

// Define SignUp schema and model
const SignUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    "email-id": { type: String, required: true },
    dateofbirth: { type: String, required: true }
}, { collection: "SignUp" });

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { name, password, email, dateofbirth } = req.body;

    if (!name || !password || !email || !dateofbirth) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        console.log("📝 Signing up user:", name);

        // Save to SignUp collection
        const newSignUp = new SignUp({
            name: name.trim(),
            password: password.trim(),
            "email-id": email.trim(),
            dateofbirth: dateofbirth.trim()
        });
        await newSignUp.save();

        // Save to UserLogin collection
        const newLogin = new UserLogin({
            name: name.trim(),
            password: password.trim()
        });
        await newLogin.save();

        res.status(200).json({ message: "Signup successful" });

    } catch (error) {
        console.error("🔥 Signup error:", error);
        logger.error("🔥 Signup error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    let { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Both fields are required" });
    }

    name = name.trim();
    password = password.trim();

    try {
        const user = await UserLogin.findOne({ name });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Details are valid" });

    } catch (error) {
        console.error("🔥 Login error:", error);
        logger.error("🔥 Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

// Export the handler for Netlify Functions
module.exports.handler = serverless(app);
