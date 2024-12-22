// import { v4 as uuidv4 } from 'uuid';
// import { Faker, es } from '@faker-js/faker';

const assert = require('assert');

Feature('Send Review Restaurant');

Before(({ I }) => {
  
});

Scenario('Sent data review restaurant', async ({ I }) => {
    // Navigasi ke halaman utama
    I.amOnPage('/');
    
    // Ambil restoran pertama dari daftar
    const firstRestaurant = locate('.box__title a').first();

     // Klik untuk masuk ke halaman detail restoran
    I.click(firstRestaurant);

    // mengirim komentar ke api
    const name = "Ali Suandi";
    const comment = "menu-menu nya enak dan menarik"

    I.fillField('#fname', name);
    I.fillField('#comment', comment);
    

    // klik tombol kirim
    I.click('#sent')

    // Info Data Berhasil terkirim
    I.say('Data telah berhasil terkirim ke api', 'green')
});