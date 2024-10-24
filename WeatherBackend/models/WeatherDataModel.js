const mongoose = require('mongoose');

const weatherDataModel = new mongoose.Schema({
    city: { type: String, required: true },
    main: {type: String },
    temp: { type: Number },
    feels_like: { type: Number },
    dt: { type: Number },
    date: { type: String },
    humidity: { type: Number },
    windSpeed: { type: Number },
    visibility: { type: Number },
    pressure: { type: Number },
    dew_point: { type: Number }, 
});

module.exports = mongoose.model('WeatherData',weatherDataModel);