import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WeatherApp from '../index';

describe('WeatherApp', () => {
  test('renders weather app header', () => {
    render(
      <BrowserRouter>
        <WeatherApp />
      </BrowserRouter>
    );
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders default location', () => {
    render(
      <BrowserRouter>
        <WeatherApp />
      </BrowserRouter>
    );
    const locationText = screen.getByText(/London/i);
    expect(locationText).toBeInTheDocument();
  });
}); 