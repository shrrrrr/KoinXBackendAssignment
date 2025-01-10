// jobs/scheduler.js
const cron = require('node-cron');
const saveCryptoData = require('./fetchCryptoJob'); // Import saveCryptoData function

const scheduleCryptoJob = () => {
    cron.schedule('0 */2 * * *', saveCryptoData); // Schedule the job to run every 2 hours
};

module.exports = scheduleCryptoJob;
