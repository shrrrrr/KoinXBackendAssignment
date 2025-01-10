const axios = require('axios');
const Crypto = require('../models/Crypto'); 

const saveCryptoData = async () => {
    try {
        console.log('Fetching cryptocurrency data...'); 
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
        );

        console.log('Fetched data:', response.data); 

        const data = response.data;

        const cryptos = [
            {
                name: 'bitcoin',
                priceUSD: data.bitcoin.usd,
                marketCapUSD: data.bitcoin.usd_market_cap,
                change24h: data.bitcoin.usd_24h_change,
            },
            {
                name: 'ethereum',
                priceUSD: data.ethereum.usd,
                marketCapUSD: data.ethereum.usd_market_cap,
                change24h: data.ethereum.usd_24h_change,
            },
            {
                name: 'matic-network',
                priceUSD: data['matic-network'].usd,
                marketCapUSD: data['matic-network'].usd_market_cap,
                change24h: data['matic-network'].usd_24h_change,
            },
        ];

        
        for (const crypto of cryptos) {
            const newCrypto = new Crypto({
                name: crypto.name,
                priceUSD: crypto.priceUSD,
                marketCapUSD: crypto.marketCapUSD,
                change24h: crypto.change24h,
                timestamp: new Date(),
            });

            console.log('Saving data for:', crypto.name); 
            await newCrypto.save();
        }

        console.log('Crypto data saved successfully.');
    } catch (err) {
        console.error('Error fetching crypto data:', err.message);
    }
};

module.exports = saveCryptoData;
