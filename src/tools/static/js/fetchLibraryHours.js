document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.lib.sfu.ca/api/hours/3/summary')
        .then(response => response.json())
        .then(data => {
            console.log('Library hours data:', data);

            const libraryElement = document.getElementById('library-hours');
            if (libraryElement) {
                let content = ''; // Start with an empty string

                data.locations.forEach(location => {
                    // Check if subname exists and add it only if it's not empty
                    const subname = location.subname ? ` (${location.subname})` : '';

                    content += `
                        <div class="library-card">
                            <h3 class="library-name">${location.location_name}${subname}</h3>
                            <p><strong>Open Time:</strong> ${location.open_time}</p>
                            <p><strong>Close Time:</strong> ${location.close_time}</p>
                            <p><strong>Status:</strong> <span class="status ${location.open_now ? 'open' : 'closed'}">
                                ${location.open_now ? 'Currently Open' : 'Currently Closed'}
                            </span></p>
                            <p class="details"><strong>Details:</strong> ${location.details_string}</p>
                            <a href="${location.url}" target="_blank" class="more-info">More Info</a>
                        </div>
                        <hr>
                    `;
                });

                libraryElement.innerHTML = content;
            }
        })
        .catch(error => {
            console.error('Error fetching library hours:', error);
        });
});
