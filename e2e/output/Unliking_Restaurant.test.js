const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('unliking one restaurant', async ({ I }) => {
    // Navigasi ke halaman utama
    I.amOnPage('/');
    I.seeElement('.box__title');
  
    // Ambil restoran pertama dari daftar
    const firstRestaurant = locate('.box__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  
    // Klik untuk masuk ke halaman detail restoran
    I.click(firstRestaurant);
    I.waitForElement('#likeButton', 5);
    I.click('#likeButton');

    // Pastikan restoran ditambahkan ke halaman favorite
    I.amOnPage('/#/favorite');
    I.waitForElement('.box__title a', 5);
    const likedRestaurantTitle = await I.grabTextFrom('.box__title a');

    assert.strictEqual(
      firstRestaurantTitle, 
      likedRestaurantTitle
    )
  
    // Klik untuk masuk ke halaman detail restoran dari favorite
    I.click(locate('.box__title a').first());
  
    // Klik tombol unlike
    I.seeElement('#likeButton');
    I.click('#likeButton');
 
    // Cek daftar restor sudah kosong
    I.amOnPage('/#/favorite');
    I.dontSeeElement('.box__title');
});