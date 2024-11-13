import { render, screen } from '@testing-library/react';
import WeatherApp from '../index';

describe('WeatherApp', () => {
  test('renders weather app header', () => {
    render(<WeatherApp />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders default location', () => {
    render(<WeatherApp />);
    const locationText = screen.getByText(/London/i);
    expect(locationText).toBeInTheDocument();
  });
}); 