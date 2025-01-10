// routes/stats.js
const express = require('express');
const Crypto = require('../models/Crypto'); 
const router = express.Router();

router.get('/stats', async (req, res) => {
    const { coin } = req.query; 

    if (!coin) {
        return res.status(400).json({ message: 'Coin parameter is required' });
    }

    try {
        
        const crypto = await Crypto.findOne({ name: coin }).sort({ timestamp: -1 });

        if (!crypto) {
            return res.status(404).json({ message: `${coin} data not found` });
        }

        
        res.json({
            price: crypto.priceUSD,
            marketCap: crypto.marketCapUSD,
            "24hChange": crypto.change24h,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data from the database' });
    }
});

module.exports = router;
