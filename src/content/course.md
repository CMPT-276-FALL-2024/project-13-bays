+++
title = "Courses"
+++

<h2>Search for Courses</h2>
<div class="form-container">
    <label for="year-select">Year:</label>
    <select id="year-select" class="input-box">
        <option value="" disabled selected>Loading years...</option>
    </select>
</div>
<div class="form-container">
    <label for="term-select">Term:</label>
    <select id="term-select" class="input-box">
        <option value="" disabled selected>Please select a year first</option>
    </select>
</div>
<div class="form-container">
    <label for="department-input">Department (e.g., CMPT):</label>
    <input id="department-input" class="input-box" type="text" placeholder="Enter department code" />
</div>
<div class="form-container">
    <button id="fetch-course" class="styled-button">Fetch Courses</button>
</div>

<div id="course">
</div>

<script src="../js/fetchCourse.js"></script>

<head>
    <link rel="stylesheet" href="../css/course.css">
</head>
