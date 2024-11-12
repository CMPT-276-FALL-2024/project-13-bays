import CurrentWeather from './CurrentWeather.js'
import Forecast from './Forecast.js';
import { getDailyForecast, getHourlyForecast } from '../api/index.js';
import '../styles/components/Main.scss'

function Main(){
    console.log('Daily forecast:', getDailyForecast());
    console.log('Hourly forecast:', getHourlyForecast());
    
    const hourlyData = getHourlyForecast();
    const dailyData = getDailyForecast();

    return (
        <div className='Main'>
            <CurrentWeather/>
            {hourlyData && <Forecast type="hourly" title="HOURLY FORECAST" data={hourlyData}/>}
            {dailyData && <Forecast type="daily" title="21 DAYS FORECAST" data={dailyData}/>}
        </div>      
    );
}

export default Main;