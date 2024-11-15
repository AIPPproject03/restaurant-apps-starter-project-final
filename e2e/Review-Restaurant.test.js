const assert = require("assert");

Feature("Reviewing a Restaurant");

Before(({ I }) => {
  // Pastikan pengguna ada di halaman utama
  I.amOnPage("/");
  I.waitForElement(".restaurant-item", 5);
});

Scenario("submitting a review for a restaurant", async ({ I }) => {
  // Navigasi ke detail restoran pertama
  I.seeElement(".restaurant-item");
  const firstRestaurant = locate(".restaurant-item").first();
  I.click(firstRestaurant);
  I.wait(2);

  // Pastikan halaman detail restoran ditampilkan dengan form review
  I.seeElement("#reviewForm");
  I.saveScreenshot("restaurant_detail_before_review.png");

  // Mengisi form review
  const name = "Test User";
  const reviewText = "This is a test review.";
  I.fillField("#reviewName", name);
  I.fillField("#reviewText", reviewText);
  I.saveScreenshot("filled_review_form.png");

  // Klik tombol submit review
  I.click(locate("button").withText("Submit Review"));
  I.wait(2);
  I.saveScreenshot("after_submit_review.png");

  // Verifikasi bahwa review baru muncul di container
  I.waitForElement("#reviewsContainer", 5);
  const latestReview = locate(".review").last();
  const displayedName = await I.grabTextFrom(latestReview.find("strong"));
  const displayedReviewText = await I.grabTextFrom(
    latestReview.find("p:nth-of-type(2)")
  );

  // Periksa kesesuaian nama dan isi review
  assert.strictEqual(displayedName, name);
  assert.strictEqual(displayedReviewText, reviewText);

  I.say("Review berhasil ditambahkan dan ditampilkan.");
  I.saveScreenshot("review_displayed.png");
});
