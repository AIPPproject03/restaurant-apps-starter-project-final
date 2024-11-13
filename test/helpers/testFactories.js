import FavoriteButtonInitiator from "../../src/scripts/utils/favorite-button-initiator";

// Fungsi untuk menginisialisasi tombol favorite dengan data restoran
const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonInitiator.init({
    favoriteButtonContainer: document.querySelector("#favoriteButtonContainer"),
    restaurant,
  });
};

// Fungsi untuk membuat elemen container untuk tombol favorite
const addFavoriteButtonContainer = () => {
  document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
};

export {
  createFavoriteButtonPresenterWithRestaurant,
  addFavoriteButtonContainer,
};
