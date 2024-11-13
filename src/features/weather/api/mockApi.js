
import currentWeatherData from './current-weather.json';
import hourlyForecastData from './hourly-forecast.json';
import dailyForecastData from './daily-forecast.json';

export async function getWeatherData(endpoint) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch (endpoint) {
    case 'current':
      return { current: currentWeatherData.current, units: 'uk' };
    case 'hourly':
      return { hourly: { data: hourlyForecastData.hourly.data } };
    case 'daily':
      return { daily: { data: dailyForecastData.daily.data } };
    default:
      throw new Error('Invalid endpoint');
  }
}

export async function searchPlaces(text) {
  // Return dummy place data
  return [
    {
      place_id: "london_gb",
      name: "London",
      country: "United Kingdom",
      timezone: "Europe/London"
    }
  ];
}