// import CONFIG from '../../globals/config';

const createMenuTemplate = (menu) => `
        <div class="box">
          <div class="box__city">${menu.city}</div>
          <picture>
            <source class="lazyload"  media="(max-width: 500px)" data-srcset="https://restaurant-api.dicoding.dev/images/small/${menu.pictureId}">
            <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/medium/${menu.pictureId}" alt="gambar ${menu.name}">
          </picture>
          <div class="box__rating">Rating : <i class="fa-solid fa-star" aria-hidden="true"></i>${menu.rating}</div>
          <div class="box__title"><a href="#/detail/${menu.id}">${menu.name}</a></div>
          <div class="box_description">${menu.description.slice(0, 100)}</div>
        </div>
`;

const createDetailTemplate = (menu) => `
  <div class="box">
    <h2 class="box__title">Restoran: ${menu.name}</h2>
    <div class="image__container">
      <div class="box__city_detail">${menu.city}</div>
      <img class="box__image lazyload" 
        data-src="https://restaurant-api.dicoding.dev/images/medium/${menu.pictureId}" 
        alt="gambar ${menu.name}" 
      />
      <div id="likeButtonContainer"></div>
    </div>
    <div class="details__container">
      <div class="details__rating">
        <h2>Ratings: <i class="fa-solid fa-star" aria-hidden="true"></i></i>${menu.rating}</h2>       
      </div>
      <div class="details__category">
      ${menu.categories
        .map((category) => `<li class="category">${category.name}</li>`)
        .join('')}  
      </div>
    </div>
    <h2 tabindex="0" id="resto-detail-form-review"><span>Reviews</span></h2>
    <div tabindex="0" class="detail-review">
      ${menu.customerReviews
        .map((review) => `
          <div class="detail-review-item">
            <div class="header-review">
              <p class="name-review"><i title="restaurant" class="fa fa-user-circle" style="font-size:1.3em; padding-right:10px;"></i>${review.name}</p>
              <p class="date-review">${review.date}</p>
            </div>
            <div class="body-review">${review.review}</div>
          </div>
        `)
        .join('')}
    </div>
    <label for="input-title" class="label-title">Comment</label>
    <div class="container">
      <form id="form-input">
        <div class="row">
          <div class="col-25">
            <label for="fname">Nama</label>
          </div>
          <div class="col-75">
            <input type="text" id="fname" name="firstname" placeholder="Your name..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="note">Catatan</label>
          </div>
          <div class="col-75">
            <textarea id="comment" name="comment" placeholder="Write something.." style="height:200px"></textarea>
          </div>
        </div>
        <div class="row">
          <button type="button" id="sent" class="btn btn-success">Kirim</button>
        </div>
      </form>
    </div>
  </div>
  <div class="box">
    <h2>ADDRESS</h2>
    <p>${menu.address}</p><br />
    <h2>DESKRIPSI</h2>
    <p>${menu.description}</p><br />
    <h2 tabindex="0" id="resto-detail-form-menu"><span>List Menu</span></h2>
    <div class="restaurant-detail__menu-list">
      <div class="foods">
        <h3 class="bg-food">FOODS</h3>
        <ul class="restaurant-detail__foods">
          ${menu.menus.foods.map((food) => `<li><i class="fa fa-cutlery font-decoration"></i> ${food.name}</li>`)
            .join('')}
        </ul>
      </div>
      <div class="drinks">
        <h3 class="bg-drink">DRINKS</h3>
        <ul class="restaurant-detail__drinks">
          ${menu.menus.drinks.map((drink) => `<li><i class="fa fa-coffee font-decoration"></i> ${drink.name}</li>`)
            .join('')}
        </ul>
      </div>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurants" id="likeButton" class="like  ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="white" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
  </button>
`;
const createUnlikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurants" id="likeButton" class="like">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="white" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
  </button>
`;

export {
    createMenuTemplate,
    createDetailTemplate,
    createLikeRestaurantButtonTemplate,
    createUnlikedRestaurantButtonTemplate
};

