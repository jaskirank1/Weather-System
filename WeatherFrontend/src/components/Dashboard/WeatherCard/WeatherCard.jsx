import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useWeatherContext } from '../../../context/WeatherContext';
import { convertTemperature } from '../../../utils/tempConversionUtils';
import './WeatherCard.css';
import 'weather-icons/css/weather-icons.css';
import { getWeatherIconClass } from '../../../utils/weatherIconMapping';

const WeatherCard = () => {
  const { unit, selectedCity } = useWeatherContext();
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeather(selectedCity);
      if (data) {
        const convertedData = {
          ...data,
          temp: Math.round(convertTemperature(data.temp, unit)),
          feels_like: Math.round(convertTemperature(data.feels_like, unit)),
        };
        setWeatherData(convertedData);
      }
    };
    
    fetchData();

    // Fetch data every 5 minutes
    const intervalId = setInterval(fetchData, 300000);

    return () => clearInterval(intervalId);
  }, [selectedCity, unit]);

  return (
    <div className="weather-card">
      {weatherData ? (
        <>
          <div className="weather-header">
            <h4>Current weather</h4>
            <p>{new Date().toLocaleTimeString()}</p>
          </div>
          <div className="weather-main-info">
            <div className="temp-icon">
              <i className={`wi ${getWeatherIconClass(weatherData.main)}`}></i>
              <span className="temperature">
                {weatherData.temp}<span className='temperature-unit'>°{unit === 'metric' ? 'C' : 'F'}</span>
              </span>
            </div>
            <div className="weather-details">
              <p>{weatherData.main}</p>
              <p className='weather-details-feels-like'>Feels like: {weatherData.feels_like}°{unit === 'metric' ? 'C' : 'F'}</p>
            </div>
          </div>
          <div className="weather-stats">
            <div className='weather-attributes'>
              <p>Wind:</p>
              <p>{weatherData.windSpeed} km/h</p>
            </div>
            <div className='weather-attributes'>
              <p>Humidity:</p>
              <p>{weatherData.humidity}%</p>
            </div>
            <div className='weather-attributes'>
              <p>Visibility:</p> 
              <p>{weatherData.visibility} km</p>
            </div>
            <div className='weather-attributes'>
              <p>Pressure:</p> 
              <p>{weatherData.pressure} mb</p>
            </div>
            <div className='weather-attributes'>
              <p>Dew Point:</p> 
              <p>{weatherData.dew_point}°</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherCard;
