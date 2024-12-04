import { useContext } from 'react';
import { ThemeProvider } from './context/theme.context';
import ThemeContext from './context/theme.context';
import { WeatherProvider } from './context/weather.context';
import Header from './components/Header';
import Main from './components/Main';
import './styles/components/App.scss';
import './styles/components/Search.scss';
import './styles/components/Loader.scss';
import './styles/components/Main.scss';
import './styles/components/Forecast.scss';
import './styles/base/_reset.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

function WeatherAppContent() {
  const { dark } = useContext(ThemeContext);
  
  return (
    <div className={`Weather App-${dark ? 'dark' : 'light'}`}>
      <Header />
      <Main />
    </div>
  );
}

function WeatherApp() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherAppContent />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default WeatherApp; 