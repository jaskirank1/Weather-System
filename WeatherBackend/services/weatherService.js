const axios = require('axios')
const WeatherData = require('../models/WeatherDataModel')
const fetchWeatherData = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    
    const { weather, main, wind, visibility, dt } = response.data;
    const tempInCelsius = main.temp - 273.15; // Convert from Kelvin to Celsius
    const feelsLikeCelsius = main.feels_like - 273.15; 
    const dewPoint = tempInCelsius - ((100 - main.humidity) / 5);
    const date = new Date(dt * 1000).toISOString().split('T')[0];   // Convert Unix timestamp to 'YYYY-MM-DD' format
    
    const newWeatherData = new WeatherData({
      city,
      main: weather[0].main,
      temp: Math.round(tempInCelsius),
      feels_like: Math.round(feelsLikeCelsius),
      dt,
      date,
      humidity: main.humidity,
      windSpeed: wind.speed,
      visibility: visibility / 1000,
      pressure: main.pressure,
      dew_point: Math.round(dewPoint),
    });

    await newWeatherData.save();
    return newWeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', city, error);
    throw error;
  }
};

module.exports = { fetchWeatherData };