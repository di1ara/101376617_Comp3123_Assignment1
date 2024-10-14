const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure your User model is correctly referenced
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing

// User Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with the hashed password
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword // Save the hashed password
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        return res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// User Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const userCheck = await User.findOne({ username });
        if (!userCheck) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        // Compare the password with the hashed password in the database
        const passCheck = await bcrypt.compare(password, userCheck.password);
        if (!passCheck) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        // Successful login
        return res.status(200).json({ 
            status: true,
            username: userCheck.username,
            message: 'User logged in successfully'
        });
    } catch (e) {
        return res.status(500).json({ message: 'Server error', error: e.message });
    }
});

module.exports = router;
