// import defaultData from '../../../public/data/DATA.json';
import { createMenuTemplate } from '../templates/template-creator';
import restaurantDbSource from '../../../scripts/data/getApiRestaurants';
const Home = {
    async render() {
        return `
            <section class="hero" id="hero">
                <picture>
                    <source media="(max-width: 500px)" srcset="./public/images/heros/hero-image_2-small.webp">
                    <source media="(max-width: 800px)" srcset="./public/images/heros/hero-image_2-medium.webp">
                    <img src="./public/images/heros/hero-image_2-large.webp" alt="">
                </picture>
                <div class="content">
                    <h3>
                        Nikmati Setiap <span>Gigitan</span> , Rasakan <span>Kebahagiaan</span>
                    </h3>
                </div>
            </section>
            <section class="menu" id="menu">
                <h1 class="heading">Daftar <span>Restaurants</span></h1>
                <div class="box-container"></div>
            </section>
            <div class="loader" aria-label="Sedang Memuat Data"></div>
        `;
    },

      _hideLoading() {
        this.loadingIndicator.style.display = 'none'
      },
    
      _showLoading() {
        this.loadingIndicator.style.display = 'block'
      },

    async afterRender() {
        setTimeout(() => {
            this.loadingIndicator = document.querySelector('.loader')
            this._showLoading()
        , 3000})

        // Fungsi ini akan dipanggil setelah render()
        const APP_RESTAURANTS = await restaurantDbSource.homeRestaurants();
        const menusContainer = document.querySelector('.box-container');
        APP_RESTAURANTS.forEach((menu) => {
            menusContainer.innerHTML += createMenuTemplate(menu);
        });
        this._hideLoading()
    },
};

export default Home;