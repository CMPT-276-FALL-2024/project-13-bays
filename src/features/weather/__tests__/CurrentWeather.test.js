import { render, screen } from '@testing-library/react';
import CurrentWeather from '../components/CurrentWeather';
import WeatherContext from '../context/weather.context';
import { UNITS } from '../constants';

const mockWeatherData = {
  cloud_cover: 14,
  feels_like: 28.8,
  humidity: 47,
  icon_num: 3,
  precipitation: { total: 0.0, type: 'none' },
  summary: 'Mostly sunny',
  temperature: 27.0,
  uv_index: 7.57,
  visibility: 15.29,
  wind: { speed: 4.1, gusts: 9.0, angle: 170, dir: 'S' }
};

const mockContextValue = {
  units: UNITS.uk,
  loading: false
};

describe('CurrentWeather', () => {
  test('renders current temperature', () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <CurrentWeather data={mockWeatherData} />
      </WeatherContext.Provider>
    );
    
    const temperature = screen.getByText(/27/);
    expect(temperature).toBeInTheDocument();
  });

  test('renders weather summary', () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <CurrentWeather data={mockWeatherData} />
      </WeatherContext.Provider>
    );
    
    const summary = screen.getByText(/Mostly sunny/i);
    expect(summary).toBeInTheDocument();
  });
}); 