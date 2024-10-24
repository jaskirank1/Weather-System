import React, { useState, useEffect } from 'react';
import './DailySummary.css';
import { useWeatherContext } from '../../../context/WeatherContext';
import axios from 'axios';
import { convertTemperature } from '../../../utils/tempConversionUtils';

const DailySummary = () => {
  const { unit, selectedCity } = useWeatherContext();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/daily-summary?city=${selectedCity}`);
        setSummary(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching summary');
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherSummary();
  }, [selectedCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!summary) return <div>No summary available for {selectedCity}</div>;

  // Converting temperatures based on selected unit
  const maxTemperature = convertTemperature(summary.maxTemperature, unit)?.toFixed(1) || 'N/A';
  const averageTemperature = convertTemperature(summary.averageTemperature, unit)?.toFixed(1) || 'N/A';
  const minTemperature = convertTemperature(summary.minTemperature, unit)?.toFixed(1) || 'N/A';

  return (
    <div className="weather-summary-card">
      <h2 className="card-title">
        Today's Summary for {selectedCity} 
      </h2>
      <div className="card-content">
        <div className="card-item">
          <span className="label">Maximum Temperature</span>
          <span className="value">{maxTemperature}°{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <hr className="separator" />
        <div className="card-item">
          <span className="label">Average Temperature</span>
          <span className="value">{averageTemperature}°{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <hr className="separator" />
        <div className="card-item">
          <span className="label">Minimum Temperature</span>
          <span className="value">{minTemperature}°{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <hr className="separator" />
        <div className="card-item">
          <span className="label">Dominant Weather Condition</span>
          <span className="value">{summary.dominantCondition}</span>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
