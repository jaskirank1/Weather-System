// const cron = require('node-cron');
// const WeatherData = require('./models/WeatherData')
// const DailyWeatherSummary = require('./models/DailyWeatherSummary');

// // Schedule task to run at midnight every day
// cron.schedule('0 0 * * *', async () => {
//     const today = new Date();
//     const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//     // Fetch weather records for today
//     const weatherRecords = await WeatherData.find({
//         dt: { $gte: startOfDay, $lte: endOfDay }
//     });

//     // Group weather data by city
//     const weatherDataByCity = weatherRecords.reduce((acc, record) => {
//         if (!acc[record.city]) {
//             acc[record.city] = [];
//         }
//         acc[record.city].push(record);
//         return acc;
//     }, {});

//     // Iterate over each city and calculate the summary
//     for (const city in weatherDataByCity) {
//         const cityWeatherData = weatherDataByCity[city];
//         const temperatures = cityWeatherData.map(record => record.temp);
//         const windSpeeds = cityWeatherData.map(record => record.windSpeed);

//         // Calculate daily aggregates for the city
//         const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
//         const maxTemperature = Math.max(...temperatures);
//         const minTemperature = Math.min(...temperatures);
//         const averageWind = windSpeeds.reduce((sum, wind) => sum + wind, 0) / windSpeeds.length;
//         const maxWind = Math.max(...windSpeeds);
//         const minWind = Math.min(...windSpeeds);

//         // Save the summary for the city
//         const dailySummary = new DailyWeatherSummary({
//             city,
//             date: startOfDay,
//             averageTemperature,
//             maxTemperature,
//             minTemperature,
//             averageWind,
//             maxWind,
//             minWind,
//         });

//         await dailySummary.save();
//         console.log('Daily weather summary saved for', city);
//     }
// });
