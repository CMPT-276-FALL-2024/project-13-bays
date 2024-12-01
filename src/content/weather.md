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
    <div id="hourly-forecast" class="hourly-forecast-container"></div>
    <div id="daily-forecast" class="daily-forecast-container"></div>
</div>

<script src="../js/fetchWeather.js"></script>
