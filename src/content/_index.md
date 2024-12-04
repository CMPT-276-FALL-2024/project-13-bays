+++
+++

<div class="image-container">
    <a href="./about" class="image-link">
        <img src="Backpack.png" alt="Toolbox" class="glowing-image" />
    </a>
</div>

<style>
/* styles for the image container */
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

/* remove default link styling */
.image-link {
    text-decoration: none;
    display: inline-block;
}

/* initial styling for the image */
.glowing-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    cursor: pointer;
}

/* glow animation on click */
.image-link:active .glowing-image {
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(234, 88, 12, 0.8);
    transform: scale(1.05);
}
</style>

> Your one-stop hub with essential tools for Simon Fraser University students
