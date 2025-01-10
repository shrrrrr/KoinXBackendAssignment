// services/cryptoService.js
const axios = require('axios');

const fetchCryptoData = async () => {
    const coinIds = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `https://api.coingecko.com/api/v3/simple/price`;
    try {
        const { data } = await axios.get(url, {
            params: {
                ids: coinIds.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true,
            },
        });

        return Object.entries(data).map(([key, value]) => ({
            name: key,
            priceUSD: value.usd,
            marketCapUSD: value.usd_market_cap,
            change24h: value.usd_24h_change,
        }));
    } catch (err) {
        console.error('Error fetching crypto data:', err.message);
        throw err;
    }
};

module.exports = fetchCryptoData;
