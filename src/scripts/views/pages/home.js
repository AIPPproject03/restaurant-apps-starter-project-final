// src/public/views/pages/home.js
import RestaurantSource from '../../data/restaurant-source';
import CONFIG from '../../globals/config';

const Home = {
  async render() {
    return `
      <section class="hero">
        <img src="../images/heros/hero-image_1.jpg" alt="Delicious food served" class="hero__image">
        <h2 class="hero__title">Welcome to Our Restaurant Catalogue</h2>
      </section>

      <section class="explore">
        <h2>Explore Restaurant</h2>
        <div class="restaurant-list" id="restaurant-list"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.list();
    const restaurantListContainer = document.getElementById('restaurant-list');

    restaurants.forEach((restaurant) => {
      restaurantListContainer.innerHTML += `
        <a href="#/detail/${restaurant.id}" class="restaurant-item">
          <article>
            <img class="restaurant-item__image" src="${CONFIG.BASE_IMAGE_URL.SMALL}${restaurant.pictureId}" alt="${restaurant.name}">
            <div class="restaurant-item__content">
              <h3 class="restaurant-item__name">${restaurant.name}</h3>
              <p class="restaurant-item__city">City: ${restaurant.city}</p>
              <p class="restaurant-item__rating">Rating: ${restaurant.rating}</p>
            </div>
          </article>
        </a>
      `;
    });
  },
};

export default Home;
