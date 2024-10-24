const express = require('express');
const { getWeatherData, fetchAllWeatherData } = require('../controllers/weatherController');
const { getDailyWeatherSummary, calculateAndStoreDailySummary, fetchDailyWeatherSummaries } = require('../controllers/weatherSummaryController')
const router = express.Router();

router.get('/weather', getWeatherData);
router.get('/fetchAllWeather', fetchAllWeatherData);
router.get('/daily-summary',getDailyWeatherSummary);
router.get('/daily-summary-chart', fetchDailyWeatherSummaries);
router.post('/calculate-store', calculateAndStoreDailySummary);
// router.get('/forecast', getForecastData);

module.exports = router;