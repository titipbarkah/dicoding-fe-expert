import UrlParser from '../../router/url-parser';
import restaurantDbSource from '../../../scripts/data/getApiRestaurants';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createDetailTemplate } from '../templates/template-creator';
import FavoriteRestaurantIdb from '../../data/favorite-restorant-idb';


// import LikeButtonInitiator from '../../utils/like-button-initiator';

const Details = {
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
                <h1 class="heading"><span>DETAIL</span> Restoran</h1>
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
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const APP_RESTAURANTS = await restaurantDbSource.detailRestaurants(url.id);
        const restaurantContainer = document.querySelector('.box-container');
        restaurantContainer.innerHTML += createDetailTemplate(APP_RESTAURANTS);

        LikeButtonPresenter.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            favoriteRestaurants: FavoriteRestaurantIdb, 
            restaurant: {
                id: APP_RESTAURANTS.id,
                name: APP_RESTAURANTS.name,
                city: APP_RESTAURANTS.city,
                pictureId: APP_RESTAURANTS.pictureId,
                description: APP_RESTAURANTS.description,
                rating: APP_RESTAURANTS.rating,
            },
        });


        document.querySelector("#form-input").querySelector("button").onclick = async (event) => {
            event.preventDefault();

            console.log("test")
            const name = document.querySelector("#fname").value;
            const review = document.querySelector("#comment").value;
            const reviewObj = {
                id: url.id,
                name,
                review
            };

            await restaurantDbSource.reviewRestaurants(reviewObj);
            const APP_RESTAURANTS = await restaurantDbSource.detailRestaurants(url.id);
            const restaurantContainer = document.querySelector('.box-container');
            restaurantContainer.innerHTML = createDetailTemplate(APP_RESTAURANTS);

            LikeButtonPresenter.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                favoriteRestaurants: FavoriteRestaurantIdb, 
                restaurant: {
                    id: APP_RESTAURANTS.id,
                    name: APP_RESTAURANTS.name,
                    city: APP_RESTAURANTS.city,
                    pictureId: APP_RESTAURANTS.pictureId,
                    description: APP_RESTAURANTS.description,
                    rating: APP_RESTAURANTS.rating,
                },
            });
            return false
        }
        this._hideLoading()
        console.log('Initializing Like Button...');
    },
    
};

export default Details;