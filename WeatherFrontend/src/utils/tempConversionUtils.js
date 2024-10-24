export const convertTemperature = (value, unit) => {
    if (value === null || value === undefined) return undefined;
    if (unit === 'imperial') {
      return (value * 9/5) + 32; // Convert Celsius to Fahrenheit
    }
    return value; // Return as it is for Celsius
};