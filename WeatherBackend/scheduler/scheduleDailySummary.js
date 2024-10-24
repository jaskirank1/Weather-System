const {calculateAndStoreDailySummary} = require('../controllers/weatherSummaryController')

const scheduleDailyUpdates = () => {
    const updateInterval = 2 * 60 * 60 * 1000; // update in every 2 hours
    setInterval(async () => {
        await calculateAndStoreDailySummary();
    }, updateInterval);
};

module.exports = { scheduleDailyUpdates };  