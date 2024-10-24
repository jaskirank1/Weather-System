export const getWeatherIconClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'wi wi-day-sunny';
      case 'clouds':
        return 'wi wi-cloudy';
      case 'rain':
        return 'wi wi-rain';
      case 'haze':
        return 'wi wi-day-haze';
      case 'snow':
        return 'wi wi-snow';
      case 'thunderstorm':
        return 'wi wi-thunderstorm';
      case 'mist':
        return 'wi wi-fog';
      default:
        return 'wi wi-day-cloudy'; 
    }
};  