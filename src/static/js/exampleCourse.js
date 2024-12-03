document.addEventListener("DOMContentLoaded", function() {
    const courseContainer = document.getElementById("course");

    fetch("https://www.sfu.ca/bin/wcm/course-outlines?2015/summer/cmpt/110/c100")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const courseInfo = data.info;

            // create html for the course
            const courseHTML = `
                <h2>${courseInfo.name} - ${courseInfo.title}</h2>
                <p><strong>Term:</strong> ${courseInfo.term}</p>
                <p><strong>Units:</strong> ${courseInfo.units}</p>
                <p><strong>Description:</strong> ${courseInfo.description}</p>
                <p><strong>Delivery Method:</strong> ${courseInfo.deliveryMethod}</p>
                <p><strong>Prerequisites:</strong> ${courseInfo.prerequisites}</p>
                <p><strong>Educational Goals:</strong> ${courseInfo.educationalGoals}</p>
                <h3>Instructor</h3>
                <p><strong>Name:</strong> ${data.instructor[0].name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.instructor[0].email}">${data.instructor[0].email}</a></p>
                <p><strong>Phone:</strong> ${data.instructor[0].phone}</p>
                <h3>Schedule</h3>
                <p><strong>Days:</strong> ${data.courseSchedule[0].days}</p>
                <p><strong>Time:</strong> ${data.courseSchedule[0].startTime} - ${data.courseSchedule[0].endTime}</p>
                <p><strong>Campus:</strong> ${data.courseSchedule[0].campus}</p>
                <h3>Grades</h3>
                <ul>
                    ${data.grades.map(grade => `<li>${grade.description} (${grade.weight}%)</li>`).join('')}
                </ul>
                <h3>Required Texts</h3>
                <p>${data.requiredText[0].details}</p>
            `;

            // update the dom with the course html
            courseContainer.innerHTML = courseHTML;
        })
        .catch(error => {
            console.error("Failed to fetch course data:", error);
            courseContainer.innerHTML = `<p>Error loading course information. Please try again later.</p>`;
        });
});
