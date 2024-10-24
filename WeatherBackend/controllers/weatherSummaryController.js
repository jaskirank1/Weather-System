const WeatherData = require('../models/WeatherDataModel');
const WeatherSummary = require('../models/DailyWeatherSummaryModel');

let isRunning = false;

const calculateAndStoreDailySummary = async (req, res = null) => {
    if (isRunning) {
        if (res) {
            return res.status(409).json({ message: 'Calculation is already in progress' });
        } else {
            console.log('Calculation is already in progress');
            return;
        }
    }

    isRunning = true;
    const metroCities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad'];

    try {
        const today = new Date().toISOString().split('T')[0];

        for (const city of metroCities) {
            const todayWeatherData = await WeatherData.find({ city, date: today });
            const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5); // 'HH:MM' format

            if (todayWeatherData.length === 0) {
                console.log(`No weather data for ${city} today`);
                continue;
            }

            const temperatures = todayWeatherData.map((data) => data.temp);
            const averageTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
            const maxTemp = Math.max(...temperatures);
            const minTemp = Math.min(...temperatures);

            // Determine the dominant weather condition
            const conditionCounts = {};
            todayWeatherData.forEach((data) => {
                conditionCounts[data.main] = (conditionCounts[data.main] || 0) + 1;
            });
            const dominantCondition = Object.keys(conditionCounts).reduce((a, b) =>
                conditionCounts[a] > conditionCounts[b] ? a : b
            );

            // Storing summary in the WeatherSummary collection
            const newSummary = new WeatherSummary({
                city,
                date: today,
                time: currentTime,
                averageTemp,
                maxTemp,
                minTemp,
                dominantCondition,
            });
            await newSummary.save();
            console.log(`Daily summary stored for ${city}`);
        }
    } catch (error) {
        console.error('Error storing daily summary:', error);
        if (res) {
            return res.status(500).json({ message: 'Error storing daily summary' });
        }
    } finally {
        isRunning = false; // Reset the flag after completion
    }

    if (res) {
        return res.status(200).json({ message: 'Daily summary calculation complete' });
    } else {
        console.log('Daily summary calculation complete');
    }
};

// Function to get the daily summary for a city when requested from frontend
const getDailyWeatherSummary = async (req, res) => {
    const { city } = req.query;
    const today = new Date().toISOString().split('T')[0];

    try {
        // Fetch today's weather data for the given city from the WeatherData collection
        const currentWeatherData = await WeatherData.find({ city, date: today });

        if (currentWeatherData.length === 0) {
            return res.status(404).json({ message: 'No weather data found for today' });
        }

        // Calculate statistics
        const temperatures = currentWeatherData.map(data => data.temp);
        const averageTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length);
        const maxTemp = Math.max(...temperatures);
        const minTemp = Math.min(...temperatures);

        const conditionCounts = {};
        currentWeatherData.forEach(data => {
            conditionCounts[data.main] = (conditionCounts[data.main] || 0) + 1;
        });
        const dominantCondition = Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

        // Return the calculated summary
        res.status(200).json({
            city,
            maxTemperature: maxTemp,
            averageTemperature: averageTemp,
            minTemperature: minTemp,
            dominantCondition,
        });
    } catch (error) {
        console.error('Error fetching daily weather summary:', error);
        res.status(500).json({ message: 'Error fetching daily weather summary' });
    }
};

// Function to get daily weather summary for a specific city for chart 
const fetchDailyWeatherSummaries = async (req, res) => {
    const { city } = req.query;

    try {
        const dailySummaries = await WeatherSummary.find({ city }).sort({ date: 1 });

        if (dailySummaries.length === 0) {
            return res.status(404).json({ message: 'No daily summaries found for this city' });
        }

        const validSummaries = dailySummaries.filter(summary =>
            summary.averageTemp !== undefined &&
            summary.maxTemp !== undefined &&
            summary.minTemp !== undefined
        );

        if (validSummaries.length === 0) {
            return res.status(404).json({ message: 'No valid daily summaries found for this city' });
        }

        res.status(200).json(dailySummaries);
    } catch (error) {
        console.error('Error fetching daily weather summaries:', error);
        res.status(500).json({ message: 'Error fetching daily weather summaries' });
    }
};

module.exports = { calculateAndStoreDailySummary, getDailyWeatherSummary, fetchDailyWeatherSummaries };