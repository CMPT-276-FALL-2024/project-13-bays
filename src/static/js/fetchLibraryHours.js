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

                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card-wrapper');

                data.locations.forEach((location) => {
                    const subname = location.subname ? ` (${location.subname})` : '';
                    const card = document.createElement('div');
                    card.classList.add('library-card');
                    card.innerHTML = `
                            <h3 class="library-name">${location.location_name}${subname}</h3>
                            <p><strong>Open Time:</strong> ${location.open_time}</p>
                            <p><strong>Close Time:</strong> ${location.close_time}</p>
                            <p><strong>Status:</strong> 
                                <span class="status ${location.open_now ? 'open' : 'closed'}">
                                    ${location.open_now ? 'Currently Open' : 'Currently Closed'}
                                </span>
                            </p>
                            <a href="${location.url}" target="_blank" class="more-info">More Info</a>
                    `;

                    cardWrapper.appendChild(card);
                });

                libraryElement.innerHTML = ' ';
                libraryElement.appendChild(cardWrapper);

                const leftArrow = document.createElement('button');
                leftArrow.classList.add('left-arrow');
                leftArrow.innerText = '←';
                libraryElement.appendChild(leftArrow);

                const rightArrow = document.createElement('button');
                rightArrow.classList.add('right-arrow');
                rightArrow.innerText = '→';
                libraryElement.appendChild(rightArrow);

                const totalCards = cardWrapper.children.length;
                let currentPos = 0;
        
                function moveCarousel() {
                    const cardWidth = cardWrapper.offsetWidth;
                    cardWrapper.style.transform = `translateX(-${currentPos * (cardWidth + 75)}px)`;
                }      
        
                leftArrow.addEventListener('click', () => {
                    if (currentPos > 0) {
                        currentPos--;
                    }
        
                    else {
                        currentPos = totalCards - 1;
                    }
        
                    moveCarousel();
                });

                rightArrow.addEventListener('click', () => {
                    if (currentPos < totalCards - 1) {
                        currentPos++;
                    }
                    
                    else {
                        currentPos = 0;
                    }
        
                    moveCarousel();
                });

                moveCarousel();
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
