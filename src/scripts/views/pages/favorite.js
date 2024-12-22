import FavoriteRestaurantIdb from '../../../scripts/data/favorite-restorant-idb';
import { createMenuTemplate } from '../templates/template-creator';

const Favorite = {
    async render() {
        return `
        <section class="hero" id="hero">
            <div class="content">
                <h3>
                Nikmati Setiap <span>Gigitan</span> , Rasakan <span>Kebahagiaan</span>
                </h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                reiciendis ipsam fugiat praesentium, porro accusantium tempora commodi
                ipsa. Consequuntur illo corrupti ipsam obcaecati voluptas quos sunt
                omnis quo aperiam corporis.
                </p>
            </div>
            </section>
                <section class="menu" id="menu">
                <h1 class="heading">Favorite <span>Restorant</span></h1>
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
        this.loadingIndicator = document.querySelector('.loader')
        this._showLoading()
        // Fungsi ini akan dipanggil setelah render()
        const APP_RESTAURANTS = await FavoriteRestaurantIdb.getAllFavorite();
        const menusContainer = document.querySelector('.box-container');
        APP_RESTAURANTS.forEach((menu) => {
            menusContainer.innerHTML += createMenuTemplate(menu);
        });
        this._hideLoading()
    },
};

export default Favorite;