document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.lib.sfu.ca/api/newbooks/browse';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const bookContainer = document.getElementById('new-books');
            if (bookContainer) {
                if (data.results && data.results.length > 0) {
                    let content = '';
                    data.results.forEach(book => {
                        // Remove trailing slash from the title
                        const cleanTitle = book.title.replace(/\/$/, '').trim();

                        content += `
                            <div class="book-card">
                                <h3 class="book-title">${cleanTitle}</h3>
                                <p><strong>Department:</strong> ${book.department || 'N/A'}</p>
                                <p><strong>ISBN:</strong> ${book.isbn || 'N/A'}</p>
                                <p><strong>Location:</strong> ${book.location.toUpperCase()}</p>
                                <a href="${book.catalogue_url}" target="_blank" class="more-info">View in Catalogue</a>
                            </div>
                        `;
                    });
                    bookContainer.innerHTML = content;
                } else {
                    bookContainer.innerHTML = '<p>No new books available at the moment.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching new books:', error);
            const bookContainer = document.getElementById('new-books');
            if (bookContainer) {
                bookContainer.innerHTML = `<p>Error loading new books. Please try again later. Details: ${error.message}</p>`;
            }
        });
});
