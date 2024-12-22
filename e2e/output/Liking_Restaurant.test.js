const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  // Navigasi ke halaman utama
  I.amOnPage('/');
  I.seeElement('.box__title a');

  // Ambil restoran pertama dari daftar
  const firstRestaurant = locate('.box__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // Klik untuk masuk ke halaman detail restoran
  I.click(firstRestaurant);

  // Klik tombol like
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pastikan restoran ditambahkan ke halaman favorit
  I.amOnPage('/#/favorite');
  I.seeElement('.box__title');
  const likedRestaurantTitle = await I.grabTextFrom('.box__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});  
