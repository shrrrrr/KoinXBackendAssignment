// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const scheduleCryptoJob = require('./jobs/scheduler');
const statsRoute = require('./routes/stats'); 
const deviationRoute = require('./routes/deviation'); 


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

scheduleCryptoJob();

// Middleware and Routes
app.use(express.json());
app.use('/api', statsRoute); 
app.use('/api',deviationRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
