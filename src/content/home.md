+++
title = "Tool Selection"
+++

<style>
  #carousel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-wrapper {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    color: #fb923c;
    cursor: pointer;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: transform 0.3s ease;
  }

  .arrow:hover {
    transform: translateY(-55%);
    color: #b85c5c;
  }

  .left-arrow {
    left: 20px;
  }

  .right-arrow {
    right: 20px;
  }

  .card {
    flex: 0 0 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 12px;
    background-color: #44403c;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card img {
    max-width: 240px;
    max-height: 240px;
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .card img:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(234, 88, 12, 0.8);
  }

  .card-title {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #fb923c;
  }
</style>

<div id="carousel">
  <div class="arrow left-arrow" onclick="navigateCarousel(-1)">‹</div>
  <div class="card-wrapper" id="cardWrapper">
    <div class="card">
      <a href="../course">
        <img src="../Catalogue.png" alt="Course" />
      </a>
      <div class="card-title">Course</div>
    </div>
    <div class="card">
      <a href="../library">
        <img src="../Furniture_Catalogue.png" alt="Library" />
      </a>
      <div class="card-title">Library</div>
    </div>
    <div class="card">
      <a href="../weather">
        <img src="../SnowAnimated.gif" alt="Weather" />
      </a>
      <div class="card-title">Weather</div>
    </div>
    <div class="card">
      <a href="../book">
        <img src="../Book_Of_Stars.png" alt="Book" />
      </a>
      <div class="card-title">Book</div>
    </div>
    <div class="card">
      <a href="../room">
        <img src="../Standard_Farm_Map_Icon.png" alt="Room" />
      </a>
      <div class="card-title">Room</div>
    </div>
  </div>
  <div class="arrow right-arrow" onclick="navigateCarousel(1)">›</div>
</div>

<script>
  const cardWrapper = document.getElementById('cardWrapper');
  let currentIndex = 0;

  function navigateCarousel(direction) {
    const cards = cardWrapper.children.length;
    currentIndex = (currentIndex + direction + cards) % cards;
    const offset = -currentIndex * 100; // Move by 100% for each card
    cardWrapper.style.transform = `translateX(${offset}%)`;
  }
</script>
