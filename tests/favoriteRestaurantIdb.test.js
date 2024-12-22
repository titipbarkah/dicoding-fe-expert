import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restorant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
      (await FavoriteRestaurantIdb.getAllFavorite()).forEach(async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      });
    });
   
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
  });