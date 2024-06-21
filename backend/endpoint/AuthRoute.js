const express = require('express');
const router = express.Router();

const PersonaController = require('../controller/PersonaController');

router.post('/login', async (req, res) => {
    try {
        const result = await PersonaController.loginUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const result = await PersonaController.registerUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: 'Creation failed' });
    }
});

  
module.exports = router;