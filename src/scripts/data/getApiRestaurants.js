import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
    static async homeRestaurants() {
        const response = await fetch(API_ENDPOINT.GET_LIST_RESTAURANTS);
        const responseJson = await response.json();
        console.log(responseJson.restaurants);
        return responseJson.restaurants;

    }

    static async detailRestaurants(id) {
        const response = await fetch(API_ENDPOINT.GET_DETAIL_RESTAURANTS(id));
        const responseJson = await response.json();
        return responseJson.restaurant;
    }

    static async reviewRestaurants(data) {
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
        }
        const response = await fetch(API_ENDPOINT.REVIEW_RESTAURANTS, options)
        const responseJson = await response.json()
        }
    }

export default RestaurantDbSource;