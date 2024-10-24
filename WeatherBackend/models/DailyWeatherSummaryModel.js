const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    averageTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true }
});
  
module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);