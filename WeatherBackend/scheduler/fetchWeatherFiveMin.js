const {fetchWeatherDataForAllCities} = require('../controllers/weatherController')

// Funtion for fetching data form api and updating the database after every 5 minutes 
const fetchWeatherForAllCities = async () => {
  try {
    const weatherData = await fetchWeatherDataForAllCities(); // Fetches data for all cities
    console.log('Fetched weather data for all cities:', weatherData);
  } catch (error) {
    console.error('Error fetching all cities weather data:', error);
  }
};

// Export a function to start the scheduler
const startWeatherScheduler = () => {
  // const updateInterval = 30 * 60 * 1000;
  setInterval(fetchWeatherForAllCities, 300000);
};

module.exports = {startWeatherScheduler};