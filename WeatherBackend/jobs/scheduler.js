const cron = require('node-cron');
const WeatherData = require('../models/WeatherDataModel');

// Function to delete old data
const deleteOldData = async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await WeatherData.deleteMany({ timestamp: { $lt: thirtyDaysAgo } });
    console.log('Old raw weather data deleted successfully.');
};

// Schedule the deletion job to run daily at midnight
cron.schedule('0 0 * * *', () => {
    deleteOldData();
});