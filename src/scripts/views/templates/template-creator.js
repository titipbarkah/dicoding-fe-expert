// import CONFIG from '../../globals/config';

const createMenuTemplate = (menu) => `
        <div class="box">
          <div class="box__city">${menu.city}</div>
          <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/medium/${menu.pictureId}" alt="gambar ${menu.name}">
          <div class="box__rating">Rating : <i class="fa-solid fa-star" aria-hidden="true"></i>${menu.rating}</div>
          <div class="box__title"><a href="#/detail/${menu.id}">${menu.name}</a></div>
          <div class="box_description">${menu.description}</div>
        <br />
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
          ${menu.menus.foods
        .map((food) => `<li><i class="fa fa-cutlery font-decoration"></i> ${food.name}</li>`)
        .join('')}
        </ul>
      </div>

      <div class="drinks">
        <h3 class="bg-drink">DRINKS</h3>
        <ul class="restaurant-detail__drinks">
          ${menu.menus.drinks
        .map((drink) => `<li><i class="fa fa-coffee font-decoration"></i> ${drink.name}</li>`)
        .join('')}
        </ul>
      </div>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurants" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
const createUnlikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurants" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
    createMenuTemplate,
    createDetailTemplate,
    createLikeRestaurantButtonTemplate,
    createUnlikedRestaurantButtonTemplate
};

