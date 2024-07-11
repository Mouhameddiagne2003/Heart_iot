// routes/sensorDataRoutes.js

const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Route pour obtenir les dernières données de capteur
router.get('/latest', async (req, res) => {
    try {
        const latestData = await SensorData.findOne().sort({ timestamp: -1 }).exec();
        res.json(latestData);
    } catch (error) {
        console.error('Error fetching latest sensor data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
