const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI = "mongodb+srv://ananyarvastare:$vastare2004@logindetails.lmuti31.mongodb.net/Logindetails";

mongoose.connect(dbURI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define UserLogin schema and model
const UserLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "UserLogin" });

const UserLogin = mongoose.models.UserLogin || mongoose.model("UserLogin", UserLoginSchema);

// ✅ Define SignUp schema and model
const SignUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    "email-id": { type: String, required: true },
    dateofbirth: { type: String, required: true }
}, { collection: "SignUp" });

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

// ✅ Signup Route
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
        res.status(500).json({ message: "Server error during signup" });
    }
});

// ✅ Login Route
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
        res.status(500).json({ message: "Server error during login" });
    }
});

// ✅ Start Server
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI = "mongodb+srv://ananyarvastare:$vastare2004@logindetails.lmuti31.mongodb.net/Logindetails";

mongoose.connect(dbURI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define UserLogin schema and model
const UserLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "UserLogin" });

const UserLogin = mongoose.models.UserLogin || mongoose.model("UserLogin", UserLoginSchema);

// ✅ Define SignUp schema and model
const SignUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    "email-id": { type: String, required: true },
    dateofbirth: { type: String, required: true }
}, { collection: "SignUp" });

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

// ✅ Signup Route
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
        res.status(500).json({ message: "Server error during signup" });
    }
});

// ✅ Login Route
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
        res.status(500).json({ message: "Server error during login" });
    }
});

// ✅ Start Server
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});


