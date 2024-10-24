import React, { useEffect, useState } from 'react';
import './NavbarDashboard.css';
import { useWeatherContext } from '../../../context/WeatherContext';
import axios from 'axios';

const NavbarDashboard = () => {
  const { selectedCity, setSelectedCity, unit, setUnit } = useWeatherContext();
  const [alertMessage, setAlertMessage] = useState('');
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alerts'); 
        if (response.data.status === 'alert') {
          setAlertMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    // Set an interval to check for alerts every 30 minutes
    const interval = setInterval(fetchAlerts, 30 * 60 * 1000);
    fetchAlerts();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar-dashboard">
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <div className="unit-display">
        <div className={`unit ${unit === 'metric' ? 'circle' : 'square'}`} onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
          {unit === 'metric' ? '°C' : '°F'}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;