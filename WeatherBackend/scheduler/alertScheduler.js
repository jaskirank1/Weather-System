const {checkAlerts} = require('../services/alertService')

// Check thresholds values and alerts every 30 minutes
const startAlertScheduler = () => {
    setInterval(async () => {
        await checkAlerts();
    }, 30 * 60 * 1000);
};

module.exports = {startAlertScheduler};