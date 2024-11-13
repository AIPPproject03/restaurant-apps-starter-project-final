// favorite-button-initiator.js
import FavoriteIdb from "../data/favorite-idb";

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;

    await this.renderButton();

    this._favoriteButtonContainer.addEventListener("click", async () => {
      await this._toggleFavorite();
      await this.renderButton();
    });
  },

  async renderButton() {
    const restaurant = await FavoriteIdb.getRestaurant(this._restaurant.id);

    if (restaurant) {
      this._favoriteButtonContainer.innerHTML = `
        <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
          <span class="favorite-button__icon">★</span>
        </button>
      `;
    } else {
      this._favoriteButtonContainer.innerHTML = `
        <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
          <span class="favorite-button__icon">☆</span>
        </button>
      `;
    }
  },

  async _toggleFavorite() {
    const restaurant = await FavoriteIdb.getRestaurant(this._restaurant.id);

    if (restaurant) {
      await FavoriteIdb.deleteRestaurant(this._restaurant.id);
    } else {
      await FavoriteIdb.putRestaurant(this._restaurant);
    }
  },
};

export default FavoriteButtonInitiator;
