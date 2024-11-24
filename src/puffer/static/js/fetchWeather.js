document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.lib.sfu.ca/api/weather/current')
        .then(response => response.json())
        .then(data => {
            console.log('Weather data:', data); // Check the structure in the console

            const weatherElement = document.getElementById('weather-info');
            if (weatherElement) {
                const temperature = data.main.temp;
                const condition = data.weather[0].description; // Accessing the first element in the weather array
                const humidity = data.main.humidity;

                weatherElement.innerHTML = `
                    <p>Temperature: ${temperature}°C</p>
                    <p>Condition: ${condition}</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
