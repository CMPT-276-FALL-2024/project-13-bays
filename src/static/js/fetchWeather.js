let currentLatitude = 49.2488;
let currentLongitude = -122.9805;
let currentLocationName = 'Burnaby, BC';

async function searchLocation() {
    const searchInput = document.getElementById('location-search').value;
    if (!searchInput) return;

    try {
        const geocodeResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchInput)}&count=1&language=en&format=json`
        );
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
            alert('Location not found. Please try another search.');
            return;
        }

        const location = geocodeData.results[0];
        currentLatitude = location.latitude;
        currentLongitude = location.longitude;
        currentLocationName = `${location.name}, ${location.country}`;
        await fetchWeather();
    } catch (error) {
        console.error('Error searching location:', error);
        alert('Failed to search location. Please try again.');
    }
}

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${currentLatitude}&longitude=${currentLongitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
            `&hourly=temperature_2m,weather_code,precipitation_probability` +
            `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
            `&timezone=auto`
        );

        const airQualityResponse = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?` +
            `latitude=${currentLatitude}&longitude=${currentLongitude}` +
            `&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi` +
            `&timezone=auto`
        );

        const weatherData = await weatherResponse.json();
        const airData = await airQualityResponse.json();

        document.getElementById('location').textContent = currentLocationName;

        const weatherCodes = {
            0: { description: 'Clear sky', icon: '☀️' },
            1: { description: 'Mainly clear', icon: '🌤️' },
            2: { description: 'Partly cloudy', icon: '⛅' },
            3: { description: 'Overcast', icon: '☁️' },
            45: { description: 'Foggy', icon: '🌫️' },
            48: { description: 'Depositing rime fog', icon: '🌫️' },
            51: { description: 'Light drizzle', icon: '🌦️' },
            53: { description: 'Moderate drizzle', icon: '🌧️' },
            55: { description: 'Dense drizzle', icon: '🌧️' },
            61: { description: 'Slight rain', icon: '🌧️' },
            63: { description: 'Moderate rain', icon: '🌧️' },
            65: { description: 'Heavy rain', icon: '🌧️' },
            71: { description: 'Slight snow fall', icon: '🌨️' },
            73: { description: 'Moderate snow fall', icon: '🌨️' },
            75: { description: 'Heavy snow fall', icon: '❄️' },
            77: { description: 'Snow grains', icon: '❄️' },
            80: { description: 'Slight rain showers', icon: '🌦️' },
            81: { description: 'Moderate rain showers', icon: '🌦️' },
            82: { description: 'Violent rain showers', icon: '⛈️' },
            85: { description: 'Slight snow showers', icon: '🌨️' },
            86: { description: 'Heavy snow showers', icon: '❄️' },
            95: { description: 'Thunderstorm', icon: '⛈️' },
            96: { description: 'Thunderstorm with slight hail', icon: '🌩️' },
            99: { description: 'Thunderstorm with heavy hail', icon: '🌩️' },
        };

        const currentWeatherCode = weatherData.current.weather_code;
        const currentWeather = weatherCodes[currentWeatherCode] || { description: 'Unknown', icon: '❓' };

        document.getElementById('temperature').textContent = `${Math.round(weatherData.current.temperature_2m)}°C`;
        document.getElementById('condition').innerHTML = `${currentWeather.icon} ${currentWeather.description}`;
        document.getElementById('details').innerHTML = `
            Feels like: ${Math.round(weatherData.current.apparent_temperature)}°C<br>
            Humidity: ${weatherData.current.relative_humidity_2m}%<br>
            Wind: ${Math.round(weatherData.current.wind_speed_10m)} km/h
        `;

        const hourlyForecast = document.getElementById('hourly-forecast');
        if (hourlyForecast) {
            const currentHour = new Date().getHours();
            let forecastHTML = '<h3>Hourly Forecast</h3>';
            for (let i = currentHour + 1; i < currentHour + 25; i++) {
                const time = new Date(weatherData.hourly.time[i]).getHours();
                const temperature = Math.round(weatherData.hourly.temperature_2m[i]);
                const weatherCode = weatherData.hourly.weather_code[i];
                const weather = weatherCodes[weatherCode] || { description: 'Unknown', icon: '❓' };
                const precipProb = weatherData.hourly.precipitation_probability[i];
                forecastHTML += `
                    <div class="hourly-item">
                        <div class="hour">${time}:00</div>
                        <div class="temp">${temperature}°C</div>
                        <div class="condition">${weather.icon} ${weather.description}</div>
                        <div class="precip">${precipProb}% precip</div>
                    </div>
                `;
            }
            hourlyForecast.innerHTML = forecastHTML;
        }

        const dailyForecast = document.getElementById('daily-forecast');
        if (dailyForecast) {
            let dailyHTML = '<h3>7-Day Forecast</h3>';
            for (let i = 0; i < 7; i++) {
                const date = new Date(weatherData.daily.time[i]).toLocaleDateString('en-US', { weekday: 'long' });
                const maxTemp = Math.round(weatherData.daily.temperature_2m_max[i]);
                const minTemp = Math.round(weatherData.daily.temperature_2m_min[i]);
                const weatherCode = weatherData.daily.weather_code[i];
                const weather = weatherCodes[weatherCode] || { description: 'Unknown', icon: '❓' };
                dailyHTML += `
                    <div class="daily-item">
                        <div class="date">${date}</div>
                        <div class="temp">Max: ${maxTemp}°C, Min: ${minTemp}°C</div>
                        <div class="condition">${weather.icon} ${weather.description}</div>
                    </div>
                `;
            }
            dailyForecast.innerHTML = dailyHTML;
        }

        enableSmoothScroll();
        updateAirQuality(airData.current);
        moveAirQualityToBottom();
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Failed to load weather data';
        console.error('Error fetching data:', error);
    }
}

function updateAirQuality(airData) {
    document.getElementById('pm2_5').querySelector('.value').textContent =
        `${Math.round(airData.pm2_5)} µg/m³`;
    document.getElementById('pm10').querySelector('.value').textContent =
        `${Math.round(airData.pm10)} µg/m³`;
    document.getElementById('carbon_monoxide').querySelector('.value').textContent =
        `${Math.round(airData.carbon_monoxide)} µg/m³`;
    document.getElementById('nitrogen_dioxide').querySelector('.value').textContent =
        `${Math.round(airData.nitrogen_dioxide)} µg/m³`;
    document.getElementById('sulphur_dioxide').querySelector('.value').textContent =
        `${Math.round(airData.sulphur_dioxide)} µg/m³`;
    document.getElementById('ozone').querySelector('.value').textContent =
        `${Math.round(airData.ozone)} µg/m³`;

    const aqiElement = document.getElementById('aqi-index');
    const aqi = airData.european_aqi;
    let qualityClass = 'quality-good';
    let qualityText = 'Good';

    if (aqi > 100) {
        qualityClass = 'quality-very-poor';
        qualityText = 'Very Poor';
    } else if (aqi > 75) {
        qualityClass = 'quality-poor';
        qualityText = 'Poor';
    } else if (aqi > 50) {
        qualityClass = 'quality-moderate';
        qualityText = 'Moderate';
    }

    aqiElement.className = `aqi-index ${qualityClass}`;
    aqiElement.textContent = `Air Quality Index: ${aqi} (${qualityText})`;
}

function moveAirQualityToBottom() {
    const airQualityPanel = document.querySelector('.air-quality-container');
    const parent = document.getElementById('weather-info');
    if (airQualityPanel && parent) {
        parent.appendChild(airQualityPanel);
    }
}

function enableSmoothScroll() {
    const smoothScrollContainers = document.querySelectorAll('.hourly-forecast-container, .daily-forecast-container');
    smoothScrollContainers.forEach(container => {
        container.addEventListener('wheel', (event) => {
            event.preventDefault();
            container.scrollBy({
                left: event.deltaY < 0 ? -150 : 150,
                behavior: 'smooth'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    enableSmoothScroll();
});

setInterval(fetchWeather, 30 * 60 * 1000);
