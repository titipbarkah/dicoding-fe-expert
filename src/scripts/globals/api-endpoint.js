import CONFIG from './config';

const API_ENDPOINT = {
    GET_LIST_RESTAURANTS: `${CONFIG.BASE_URL}/list`,
    GET_DETAIL_RESTAURANTS: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
    SEARCH_RESTAURANTS: `${CONFIG.BASE_URL}/search?q=<query>`,
    REVIEW_RESTAURANTS: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;