const express = require('express');
const Crypto = require('../models/Crypto'); 

const router = express.Router();


function calculateStandardDeviation(values) {
    const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
    const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}

// GET request /deviation
router.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Coin parameter is required' });
    }

    try {
    
        const records = await Crypto.find({ name: coin }).sort({ timestamp: -1 }).limit(100);

        if (records.length === 0) {
            return res.status(404).json({ message: `${coin} data not found` });
        }

    
        const prices = records.map(record => record.priceUSD);

        
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching or calculating data' });
    }
});

module.exports = router;
