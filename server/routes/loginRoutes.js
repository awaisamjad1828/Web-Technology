const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const { loginSchema } = require('../validation/userValidate'); 
const { z } = require("zod");
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const parsedData = loginSchema.parse(req.body);
        const user = await userModel.findOne({ email: parsedData.email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(parsedData.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login successful', 
            user: { fullName: user.fullName, email: user.email },
            token // Return the JWT token
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

module.exports = router;
