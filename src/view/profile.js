import {createElement} from "../utils";

const TEST_USER_RATING = 15;
const USER_RATING_TITLE = {
  noTitle: {
    title: ``,
    max: 0
  },
  low: {
    title: `Novice`,
    min: 1,
    max: 10
  },
  middle: {
    title: `Fan`,
    min: 11,
    max: 20
  },
  high: {
    title: `Movie Buff`,
    min: 21
  }
};

const matchRatingWithRank = (rating) => {

  let ratingTitle;

  switch (true) {
    case rating === USER_RATING_TITLE.noTitle.max:
      ratingTitle = USER_RATING_TITLE.noTitle.title;
      break;
    case rating >= USER_RATING_TITLE.low.min && rating <= USER_RATING_TITLE.low.max:
      ratingTitle = USER_RATING_TITLE.low.title;
      break;
    case rating >= USER_RATING_TITLE.middle.min && rating <= USER_RATING_TITLE.middle.max:
      ratingTitle = USER_RATING_TITLE.middle.title;
      break;
    case rating >= USER_RATING_TITLE.high.min:
      ratingTitle = USER_RATING_TITLE.high.title;
      break;
  }
  return ratingTitle;
};

const createProfileRatingTemplate = (userRating) => {
  return `<section class="header__profile profile">
 ${userRating > 0 ? `<p class="profile__rating">${matchRatingWithRank(userRating)}</p>` : `` }
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class Profile {
  constructor(userRating = TEST_USER_RATING) {
    this._userRating = userRating;
    this._element = null;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._userRating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
