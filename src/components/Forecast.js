import "../styles/components/Forecast.scss"
import HourlyForecastWidegt from "./HourlyForecastWidegt";
import DailyForecastWidegt from "./DailyForecastWidegt";

function Forecast({ title, type, data }) {
    console.log('Forecast data:', data);
    return (
        <div className="Forecast">
            <div className="forecast-container">
                <h3>{title}</h3>
                <div className="widget-container">
                    {
                        data?.map((singleData, index) => (
                            <div key={index}>
                                {type === "hourly" ? 
                                    (<HourlyForecastWidegt data={singleData}/>) : 
                                    (<DailyForecastWidegt data={singleData}/>)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
                    
        </div> );
}

            export default Forecast;