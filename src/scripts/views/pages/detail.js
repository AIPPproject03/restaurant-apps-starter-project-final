import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import ReviewInitiator from '../../utils/review-initiator';

const Detail = {
  async render() {
    return `
      <section id="restaurant-detail" class="restaurant-detail">
        <div id="restaurant-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detail(url.id);

    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    // Initialize the favorite button
    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.getElementById('favoriteButton'),
      restaurant,
    });

    // Initialize review form submission
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('reviewName').value;
      const review = document.getElementById('reviewText').value;

      ReviewInitiator.submitReview(restaurant.id, name, review);
      reviewForm.reset(); // Reset form after submission
    });
  },
};

export default Detail;
