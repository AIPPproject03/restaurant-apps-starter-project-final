// src/public/views/pages/home.js
import RestaurantSource from '../../data/restaurant-source';
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Home = {
  async render() {
    return `
      <section class="hero">
        <img 
          data-src="../images/heros/hero-image_1-1200.webp" 
          alt="Delicious food served" 
          class="hero__image lazyload" 
          width="1200" 
          height="600">
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
            <img 
              class="restaurant-item__image lazyload" 
              data-src="${CONFIG.BASE_IMAGE_URL.SMALL}${restaurant.pictureId}" 
              alt="${restaurant.name}" 
              width="300" 
              height="200">
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
