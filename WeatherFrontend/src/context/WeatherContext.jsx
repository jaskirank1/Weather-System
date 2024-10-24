import React, { createContext, useState, useContext } from 'react';

const WeatherContext = createContext();

// Custom hook to use the WeatherContext
export const useWeatherContext = () => useContext(WeatherContext);

// Context Provider component
export const WeatherProvider = ({children}) => {
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Delhi');
  return (
    <WeatherContext.Provider value={{ unit, setUnit, selectedCity, setSelectedCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
