const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');
const { signupSchema } = require('../validation/userValidate'); 
const { z } = require("zod"); // Ensure this is imported
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("Received request:", req.body);
    try {
        const parsedData = signupSchema.parse(req.body);
        console.log("Parsed Data:", parsedData);

        const existingUser = await userModel.findOne({ email: parsedData.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        // Create user
        const newUser = new userModel({
            fullName: parsedData.fullName,
            email: parsedData.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) { // Changed err to error
        console.error("Error:", error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

module.exports = router;
