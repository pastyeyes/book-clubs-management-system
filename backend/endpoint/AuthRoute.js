const express = require('express');
const router = express.Router();

const AuthService = require('../service/AuthService');

// Helper function to handle errors
const handleErrors = (res, error, message) => {
    console.error(error);
    res.status(400).json({ message });
  };

router.post('/login', async (req, res) => {
    try {
        const result = await AuthService.loginUser(req.body);
        res.json(result);
    } catch (error) {
        handleErrors(res, error, 'Invalid credentials');
    }
});

router.post('/register', async (req, res) => {
    try {
        const result = await AuthService.registerUser(req.body);
        res.json(result);
    } catch (error) {
        handleErrors(res, error, 'Creation failed');
    }
});

module.exports = router;