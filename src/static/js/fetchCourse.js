document.addEventListener("DOMContentLoaded", function() {
    const courseContainer = document.getElementById("course-list");
    const yearSelect = document.getElementById("year-select");
    const termSelect = document.getElementById("term-select");
    const departmentSelect = document.getElementById("department-select");

    if (!courseContainer || !yearSelect || !termSelect || !departmentSelect) {
        console.error("Error: Required elements not found in the document!");
        return;
    }

    function fetchDepartments(year, term) {
        const url = `https://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format");
                }

                departmentSelect.innerHTML = data
                    .map(dept => `<option value="${dept.value}">${dept.name || dept.text}</option>`)
                    .join("");
            })
            .catch(error => {
                console.error("Error fetching department data:", error);
                departmentSelect.innerHTML = "<option value=''>Failed to load departments</option>";
            });
    }

    function fetchCourses(year, term, department) {
        const url = `https://www.sfu.ca/bin/wcm/course-outlines?${year}/${term}/${department}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format");
                }

                if (data.length === 0) {
                    courseContainer.innerHTML = "<p>No courses found for the selected criteria.</p>";
                    return;
                }

                const courseListHTML = data
                    .map(course => {
                        const courseNumber = `CMPT ${course.text}`; // Prefix CMPT
                        const courseTitle = course.title || "No title available";
                        const courseOutlineLink = `https://www.sfu.ca/outlines.html?${year}/${term}/${department}/${course.text}/d100`;

                        return `
                            <div class="course-item">
                                <h3><a href="${courseOutlineLink}" target="_blank">${courseNumber}</a></h3>
                                <p>${courseTitle}</p>
                            </div>
                        `;
                    })
                    .join("");

                courseContainer.innerHTML = courseListHTML;
            })
            .catch(error => {
                console.error("Error fetching course data:", error);
                courseContainer.innerHTML = "<p>Failed to load course data. Please try again later.</p>";
            });
    }

    yearSelect.addEventListener("change", () => {
        const year = yearSelect.value;
        const term = termSelect.value;
        if (year && term) {
            fetchDepartments(year, term);
        }
    });

    termSelect.addEventListener("change", () => {
        const year = yearSelect.value;
        const term = termSelect.value;
        if (year && term) {
            fetchDepartments(year, term);
        }
    });

    departmentSelect.addEventListener("change", () => {
        const year = yearSelect.value;
        const term = termSelect.value;
        const department = departmentSelect.value;
        if (year && term && department) {
            fetchCourses(year, term, department);
        }
    });

    const defaultYear = "2025";
    const defaultTerm = "spring";

    yearSelect.value = defaultYear;
    termSelect.value = defaultTerm;

    fetchDepartments(defaultYear, defaultTerm);
});
