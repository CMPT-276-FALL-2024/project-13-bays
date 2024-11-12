import "../styles/components/Forecast.scss"
import HourlyForecastWidegt from "./HourlyForecastWidegt";
import DailyForecastWidegt from "./DailyForecastWidegt";
import HorizontallyScrollable from "./HorizontallyScrollable";
function Forecast({ title, type, data }) {
    console.log('Forecast data:', data);
    return (
        <div className="Forecast">
            <div className="forecast-container">
                <h3>{title}</h3>
                <HorizontallyScrollable className="widget-container">
                    {
                        data.map((singleData) => (
                            <div key={singleData.date || singleData.day}>
                                {type === "hourly" ? 
                                    (<HourlyForecastWidegt data={singleData}/>) : 
                                    (<DailyForecastWidegt data={singleData}/>)
                                }
                            </div>
                        ))
                    }
                </HorizontallyScrollable>
            </div>
                    
        </div> );
}

            export default Forecast;