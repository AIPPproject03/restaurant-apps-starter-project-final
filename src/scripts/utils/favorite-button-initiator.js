import FavoriteIdb from '../data/favorite-idb';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;

    await this.renderButton();

    this._favoriteButtonContainer.addEventListener('click', async () => {
      await this._toggleFavorite();
      await this.renderButton();
    });
  },

  async renderButton() {
    const restaurant = await FavoriteIdb.getRestaurant(this._restaurant.id);

    if (restaurant) {
      this._favoriteButtonContainer.innerHTML = `
        <span class="favorite-button__icon">★</span>
      `;
    } else {
      this._favoriteButtonContainer.innerHTML = `
        <span class="favorite-button__icon">☆</span>
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
