const assert = require("assert");

Feature("Liking and Unliking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
  I.saveScreenshot("before_empty_favorite_page.png"); // Screenshot awal di halaman favorit
});

Scenario("liking and unliking a restaurant", async ({ I }) => {
  // Verify the favorite page is initially empty
  I.see("No favorite restaurants found.", "#no-favorites-message");
  I.saveScreenshot("no_favorites_message.png");

  // Navigate to the main page to find restaurants
  I.amOnPage("/");
  I.waitForElement(".restaurant-item", 5);
  I.seeElement(".restaurant-item");
  I.saveScreenshot("main_page_with_restaurants.png");

  // Grab the first restaurant name
  const firstRestaurant = locate(".restaurant-item").first();
  const firstRestaurantName = await I.grabTextFrom(
    firstRestaurant.find(".restaurant-item__name")
  );
  I.say("Nama restoran pertama yang disukai: " + firstRestaurantName);

  // Click the first restaurant
  I.click(firstRestaurant);
  I.wait(2);
  I.saveScreenshot("restaurant_detail_page.png");

  // Like the restaurant
  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");
  I.saveScreenshot("after_liking_restaurant.png");

  // Go back to the favorite page
  I.amOnPage("/#/favorite");
  I.waitForElement(".favorite-restaurant-card", 5);
  I.seeElement(".favorite-restaurant-card");
  I.saveScreenshot("favorite_page_with_restaurant.png");

  // Grab the name of the liked restaurant
  const likedRestaurantName = await I.grabTextFrom(
    ".favorite-restaurant-card__name"
  );
  I.say("Nama restoran di halaman favorit: " + likedRestaurantName);

  // Verify the names match
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Unlike the restaurant
  I.click(locate(".favorite-restaurant-card").first());
  I.seeElement(".unfavorite-button");
  I.click(".unfavorite-button");
  I.saveScreenshot("after_unliking_restaurant.png"); // Screenshot setelah menghapus favorit

  // Verify that the favorite page is now empty
  I.amOnPage("/#/favorite");
  I.dontSeeElement(".favorite-restaurant-card");
  I.see("No favorite restaurants found.", "#no-favorites-message");
  I.saveScreenshot("empty_favorite_page.png"); // Screenshot halaman kosong setelah unlike
});
