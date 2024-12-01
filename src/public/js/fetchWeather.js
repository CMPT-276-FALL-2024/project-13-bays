async function fetchWeather() {
    try {
        const LATITUDE = 49.2488;
        const LONGITUDE = -122.9805;
        
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${LATITUDE}&longitude=${LONGITUDE}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
            `&hourly=temperature_2m,weather_code,precipitation_probability` +
            `&timezone=America/Vancouver`
        );
        
        const data = await response.json();
        
        // Convert weather code to text description
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail',
        };

        // Update current weather
        document.getElementById('location').textContent = 'Burnaby, BC';
        document.getElementById('temperature').textContent = 
            `${Math.round(data.current.temperature_2m)}°C`;
        document.getElementById('condition').textContent = 
            weatherCodes[data.current.weather_code] || 'Unknown';
        document.getElementById('details').innerHTML = `
            Feels like: ${Math.round(data.current.apparent_temperature)}°C<br>
            Humidity: ${data.current.relative_humidity_2m}%<br>
            Wind: ${Math.round(data.current.wind_speed_10m)} km/h
        `;

        // Update hourly forecast
        const hourlyForecast = document.getElementById('hourly-forecast');
        if (hourlyForecast) {
            const currentHour = new Date().getHours();
            let forecastHTML = '<h3>Hourly Forecast</h3>';
            
            // Display next 24 hours
            for (let i = currentHour + 1; i < currentHour + 25; i++) {
                const time = new Date(data.hourly.time[i]).getHours();
                const temperature = Math.round(data.hourly.temperature_2m[i]);
                const weatherCode = weatherCodes[data.hourly.weather_code[i]];
                const precipProb = data.hourly.precipitation_probability[i];
                
                forecastHTML += `
                    <div class="hourly-item">
                        <div class="hour">${time}:00</div>
                        <div class="temp">${temperature}°C</div>
                        <div class="condition">${weatherCode}</div>
                        <div class="precip">${precipProb}% precip</div>
                    </div>
                `;
            }
            hourlyForecast.innerHTML = forecastHTML;
        }

    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Failed to load weather data';
        console.error('Error fetching weather:', error);
    }
}

// Fetch weather data when the page loads
fetchWeather();

// Update weather every 30 minutes
setInterval(fetchWeather, 30 * 60 * 1000);
