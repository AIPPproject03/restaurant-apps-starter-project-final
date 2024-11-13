import FavoriteIdb from "../src/scripts/data/favorite-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking and Unliking a Restaurant", () => {
  const restaurantData = { id: 1, name: "A Test Restaurant" };

  beforeEach(() => {
    TestFactories.addFavoriteButtonContainer(); // Menambahkan container tombol
  });

  afterEach(async () => {
    // Menghapus restoran setelah setiap tes
    await FavoriteIdb.deleteRestaurant(1);
  });

  it("should show the favorite button when the restaurant has not been liked before", async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    expect(
      document.querySelector('[aria-label="favorite this restaurant"]')
    ).toBeTruthy();
  });

  it("should show the unfavorite button when the restaurant has been liked before", async () => {
    // Menyimpan restoran ke database
    await FavoriteIdb.putRestaurant(restaurantData);

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    expect(
      document.querySelector('[aria-label="unfavorite this restaurant"]')
    ).toBeTruthy();
  });

  it("should be able to like a restaurant", async () => {
    let restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toBeFalsy(); // Pastikan restoran belum ada di database

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    // Klik tombol untuk menyukai restoran
    const favoriteButton = document.querySelector(
      '[aria-label="favorite this restaurant"]'
    );
    favoriteButton.click();

    // Tunggu beberapa saat agar perubahan bisa diproses
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to wait for the async operation

    // Verifikasi apakah restoran ada di database setelah disukai
    restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toEqual(restaurantData); // Memastikan restoran sudah ada di database

    // Tambahkan log untuk memastikan apakah restoran ada di database
    console.log("Restaurant after liking:", restaurant);
  });

  it("should be able to unlike a restaurant", async () => {
    // Menyimpan restoran ke database
    await FavoriteIdb.putRestaurant(restaurantData);

    let restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toEqual(restaurantData); // Pastikan restoran sudah ada di database

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    // Klik tombol untuk membatalkan suka restoran
    const unfavoriteButton = document.querySelector(
      '[aria-label="unfavorite this restaurant"]'
    );
    unfavoriteButton.click();

    // Tunggu beberapa saat agar penghapusan berhasil
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to wait for the async operation

    // Verifikasi apakah restoran sudah terhapus dari database
    restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toBeFalsy(); // Pastikan restoran terhapus dari database

    // Tambahkan log untuk memeriksa setelah penghapusan
    console.log("Restaurant after unliking:", restaurant);
  });
});
