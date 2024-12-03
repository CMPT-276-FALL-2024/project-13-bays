+++
title = 'Weather'
+++

<link rel="stylesheet" href="../css/weather.css">

<div id="weather-info">
    <div class="search-container">
        <input type="text" id="location-search" placeholder="Enter city name">
        <button onclick="searchLocation()">Search</button>
    </div>
    <div class="weather-container">
        <div id="location">Loading weather...</div>
        <div id="temperature"></div>
        <div id="condition"></div>
        <div id="details"></div>
    </div>
    <div id="air-quality" class="air-quality-container">
        <h3>Air Quality</h3>
        <div class="air-quality-grid">
            <div class="air-quality-item" id="pm2_5">
                <div class="label">PM2.5</div>
                <div class="value">-</div>
            </div>
            <div class="air-quality-item" id="pm10">
                <div class="label">PM10</div>
                <div class="value">-</div>
            </div>
            <div class="air-quality-item" id="carbon_monoxide">
                <div class="label">CO</div>
                <div class="value">-</div>
            </div>
            <div class="air-quality-item" id="nitrogen_dioxide">
                <div class="label">NO₂</div>
                <div class="value">-</div>
            </div>
            <div class="air-quality-item" id="sulphur_dioxide">
                <div class="label">SO₂</div>
                <div class="value">-</div>
            </div>
            <div class="air-quality-item" id="ozone">
                <div class="label">O₃</div>
                <div class="value">-</div>
            </div>
        </div>
        <div id="aqi-index" class="aqi-index">Air Quality Index: -</div>
    </div>
    <div id="hourly-forecast" class="hourly-forecast-container"></div>
    <div id="daily-forecast" class="daily-forecast-container"></div>
</div>

<script src="../js/fetchWeather.js"></script>
