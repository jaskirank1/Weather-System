const { fetchWeatherData } = require('../services/weatherService');

const getWeatherData = async (req, res) => {
  const { city } = req.query;
  try {
    const weatherData = await fetchWeatherData(city);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

const fetchWeatherDataForAllCities = async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const allWeatherData = [];

  try {
    for (const city of cities) {
      const weatherData = await fetchWeatherData(city);
      if (weatherData) {
        allWeatherData.push(weatherData); // Only add successfully fetched data
      }
    }
    return allWeatherData;
  } catch (error) {
    console.error('Error fetching all cities weather data:', error);
    throw error;
  }
};

// Function to handle API requests and send the weather data response
const fetchAllWeatherData = async (req, res) => {
  try {
    const allWeatherData = await fetchWeatherDataForAllCities();
    res.status(200).json(allWeatherData);
  } catch (error) {
    console.error('Error fetching all cities weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data for all cities' });
  }
};

module.exports = { getWeatherData, fetchWeatherDataForAllCities, fetchAllWeatherData };