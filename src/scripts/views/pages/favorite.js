import FavoriteIdb from '../../data/favorite-idb';
import { createFavoriteRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section class="favorite">
        <h2>Your Favorite Restaurants</h2>
        <div id="favorite-restaurants-container"></div>
        <p id="no-favorites-message" style="display: none;">No favorite restaurants found.</p>
      </section>
    `;
  },

  async afterRender() {
    const favoriteRestaurants = await FavoriteIdb.getAllRestaurants();
    const favoriteRestaurantsContainer = document.getElementById(
      'favorite-restaurants-container'
    );
    const noFavoritesMessage = document.getElementById('no-favorites-message');

    if (favoriteRestaurants.length > 0) {
      noFavoritesMessage.style.display = 'none';
      favoriteRestaurants.forEach((restaurant) => {
        favoriteRestaurantsContainer.innerHTML +=
          createFavoriteRestaurantItemTemplate(restaurant);
      });

      // Add event listeners for unfavorite buttons
      this._addUnfavoriteListeners();
    } else {
      noFavoritesMessage.style.display = 'block';
    }
  },

  _addUnfavoriteListeners() {
    const unfavoriteButtons = document.querySelectorAll('.unfavorite-button');
    unfavoriteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const restaurantId = button.getAttribute('data-id');

        // Remove from IndexedDB
        await FavoriteIdb.deleteRestaurant(restaurantId);

        // Remove the restaurant card from the DOM
        const restaurantCard = event.target.closest(
          '.favorite-restaurant-card'
        );
        restaurantCard.remove();

        // Check if there are any favorite restaurants left
        const favoriteRestaurants = await FavoriteIdb.getAllRestaurants();
        if (favoriteRestaurants.length === 0) {
          document.getElementById('no-favorites-message').style.display =
            'block';
        }
      });
    });
  },
};

export default Favorite;
