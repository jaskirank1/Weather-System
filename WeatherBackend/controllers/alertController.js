const User = require('../models/UserModel');
const WeatherData = require('../models/WeatherDataModel');

const checkAlerts = async () => {
    const users = await User.find({ 'thresholds.isActive': true });
    const latestWeatherData = await WeatherData.find({}).sort({ createdAt: -1 }).limit(3); // Get last 3 entries (for the last 15 minutes)

    users.forEach(async (user) => {
        let consecutiveAlerts = 0;
        let alertMessage = '';

        latestWeatherData.forEach(data => {
            const temperature = data.temperature;

            if (user.thresholds.temperature !== null && temperature >= user.thresholds.temperature) {
                consecutiveAlerts++;
            }

            if (user.thresholds.weatherCondition && data.weatherCondition === user.thresholds.weatherCondition) {
                consecutiveAlerts++;
            }
        });

        if (consecutiveAlerts >= 2) {
            alertMessage = `Alert! Temperature has breached the threshold of ${user.thresholds.temperature}°C for the last two updates.`;

            console.log(alertMessage); 
            
            return { status: 'alert', message: alertMessage };
        }
    });
};

module.exports = { checkAlerts };