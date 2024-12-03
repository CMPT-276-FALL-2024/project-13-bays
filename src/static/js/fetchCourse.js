document.addEventListener("DOMContentLoaded", function() {
    const courseContainer = document.getElementById("course");
    const yearSelect = document.getElementById("year-select");
    const termSelect = document.getElementById("term-select");
    const departmentInput = document.getElementById("department-input");
    const fetchButton = document.getElementById("fetch-course");

    // Populate year dropdown dynamically in descending order
    fetch("https://www.sfu.ca/bin/wcm/course-outlines")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch years. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(years => {
            const sortedYears = years.sort((a, b) => b.value - a.value); // Sort descending
            yearSelect.innerHTML = sortedYears.map(year => `<option value="${year.value}">${year.value}</option>`).join('');
        })
        .catch(error => {
            console.error("Error fetching years:", error);
            courseContainer.innerHTML = `<p>Error loading years. Please try again later.</p>`;
        });

    // Populate term dropdown based on selected year
    yearSelect.addEventListener("change", () => {
        const year = yearSelect.value;
        fetch(`https://www.sfu.ca/bin/wcm/course-outlines?${year}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch terms for year ${year}. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(terms => {
                termSelect.innerHTML = terms.map(term => `<option value="${term.value}">${term.text}</option>`).join('');
            })
            .catch(error => {
                console.error(`Error fetching terms for year ${year}:`, error);
                courseContainer.innerHTML = `<p>Error loading terms. Please try again later.</p>`;
            });
    });

    // Fetch and display courses based on selection
    fetchButton.addEventListener("click", () => {
        const year = yearSelect.value;
        const term = termSelect.value;
        const department = departmentInput.value.trim().toLowerCase();

        if (!year || !term || !department) {
            courseContainer.innerHTML = `<p>Please fill in all fields to fetch courses.</p>`;
            return;
        }

        const apiUrl = `https://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch courses for ${department} in ${term} ${year}. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(courses => {
                if (courses.length === 0) {
                    courseContainer.innerHTML = `<p>No courses found for the selected criteria.</p>`;
                    return;
                }

                // Generate HTML for the course list
                const courseHTML = `
                    <h3>Courses Offered</h3>
                    <ul>
                        ${courses.map(course => `
                            <li>
                                <strong>${course.title}</strong> (${course.text})
                            </li>
                        `).join('')}
                    </ul>
                `;

                // Update the DOM
                courseContainer.innerHTML = courseHTML;
            })
            .catch(error => {
                console.error(`Error fetching courses for ${department} in ${term} ${year}:`, error);
                courseContainer.innerHTML = `<p>Error loading courses. Please try again later.</p>`;
            });
    });
});
