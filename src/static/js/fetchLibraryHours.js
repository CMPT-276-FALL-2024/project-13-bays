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
            console.log('Fetched library hours data:', data);

            const libraryElement = document.getElementById('library-hours');
            if (libraryElement) {
                // Create the card wrapper
                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card-wrapper');

                // Create a card for each library location
                data.locations.forEach((location) => {
                    const subname = location.subname ? ` (${location.subname})` : '';
                    const card = document.createElement('div');
                    card.classList.add('library-card');
                    card.innerHTML = `
                        <h3 class="library-name">${location.location_name}${subname}</h3>
                        <p><strong>Open Time:</strong> ${location.open_time || 'N/A'}</p>
                        <p><strong>Close Time:</strong> ${location.close_time || 'N/A'}</p>
                        <p><strong>Status:</strong> 
                            <span class="status ${location.open_now ? 'open' : 'closed'}">
                                ${location.open_now ? 'Currently Open' : 'Currently Closed'}
                            </span>
                        </p>
                        <a href="${location.url}" target="_blank" class="more-info">More Info</a>
                    `;
                    cardWrapper.appendChild(card);
                });

                // Clear existing content and append new elements
                libraryElement.innerHTML = '';
                libraryElement.appendChild(cardWrapper);

                // Add navigation arrows
                const leftArrow = document.createElement('button');
                leftArrow.classList.add('left-arrow');
                leftArrow.innerHTML = '←';
                libraryElement.appendChild(leftArrow);

                const rightArrow = document.createElement('button');
                rightArrow.classList.add('right-arrow');
                rightArrow.innerHTML = '→';
                libraryElement.appendChild(rightArrow);

                // Carousel functionality
                let currentPos = 0;
                const totalCards = cardWrapper.children.length;

                function updateVisibleCard() {
                    Array.from(cardWrapper.children).forEach((card, index) => {
                        card.style.display = index === currentPos ? 'block' : 'none';
                    });
                }

                function moveToNext() {
                    currentPos = (currentPos + 1) % totalCards;
                    updateVisibleCard();
                }

                function moveToPrevious() {
                    currentPos = (currentPos - 1 + totalCards) % totalCards;
                    updateVisibleCard();
                }

                leftArrow.addEventListener('click', moveToPrevious);
                rightArrow.addEventListener('click', moveToNext);

                // Add mouse scroll functionality
                libraryElement.addEventListener('wheel', (event) => {
                    event.preventDefault();
                    if (event.deltaY > 0) {
                        moveToNext();
                    } else {
                        moveToPrevious();
                    }
                });

                // Initialize the carousel
                updateVisibleCard();
            }
        })
        .catch((error) => {
            console.error('Error fetching library hours:', error);

            const libraryElement = document.getElementById('library-hours');
            if (libraryElement) {
                libraryElement.innerHTML = `<p>Error loading library hours. Please try again later. Details: ${error.message}</p>`;
            }
        });
});
