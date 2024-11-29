document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.lib.sfu.ca/api/hours/3/summary';

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Library hours data:', data);

            const libraryElement = document.getElementById('library-hours');

            if (libraryElement) {
                let content = '';

                data.locations.forEach((location) => {
                    const subname = location.subname ? ` (${location.subname})` : '';
                    content += `
                        <div class="library-card">
                            <h3 class="library-name">${location.location_name}${subname}</h3>
                            <p><strong>Open Time:</strong> ${location.open_time}</p>
                            <p><strong>Close Time:</strong> ${location.close_time}</p>
                            <p><strong>Status:</strong> 
                                <span class="status ${location.open_now ? 'open' : 'closed'}">
                                    ${location.open_now ? 'Currently Open' : 'Currently Closed'}
                                </span>
                            </p>
                            <p class="details"><strong>Details:</strong> ${location.details_string}</p>
                            <a href="${location.url}" target="_blank" class="more-info">More Info</a>
                        </div>
                    `;
                });

                libraryElement.innerHTML = content; // Add content to the HTML element
            }
        })
        .catch((error) => {
            console.error('Error fetching library hours:', error);

            const libraryElement = document.getElementById('library-hours');
            if (libraryElement) {
                libraryElement.innerHTML = '<p>Unable to load library hours at this time. Please try again later.</p>';
            }
        });
});
