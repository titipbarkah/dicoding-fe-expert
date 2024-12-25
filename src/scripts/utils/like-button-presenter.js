
import {
    createLikeRestaurantButtonTemplate,
    createUnlikedRestaurantButtonTemplate
} from '../views/templates/template-creator';


const LikeButtonPresenter = {
    async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = favoriteRestaurants;
        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;
        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.onclick = async () => {
            await this._favoriteRestaurants.putRestaurant(this._restaurant);
            await this._renderButton();
        };
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createUnlikedRestaurantButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.onclick = async () => {
            await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
            await this._renderButton();
        };
    },
};


export default LikeButtonPresenter;