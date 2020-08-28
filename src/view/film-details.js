import {showFullReleaseDate} from "../utils/film.js";
import {generateComment} from "../mock/film.js";
import AbstractComponentView from "./abstract-component.js";
const TEST_COMMENTS = new Array(3).fill().map(generateComment);

const TEST_FILM_DETAILS = {
  title: `TEST`,
  titleOriginal: `TEST`,
  poster: `./images/posters/made-for-each-other.png`,
  rating: `6+`,
  director: `Anthony Mann`,
  writers: `Billy Wilder`,
  actors: `Adam Sandler`,
  country: `USA`,
  releaseDate: new Date(),
  duration: `1h 55m`,
  genres: [`Action`, `Comedy`, `Cartoon`],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  comments: TEST_COMMENTS,
  isAddedToWatchlist: false,
  isMarkedAsWatched: false,
  isFavorite: false
};

const createFilmInfoHead = (film) => {
  const {
    rating,
    title,
    titleOriginal
  } = film;

  return `<div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>`;
};
const createFilmDetailsTable = (film) => {
  const {
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres
  } = film;

  return `<table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${showFullReleaseDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                ${genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``)}
               </td>
            </tr>
          </table>`;
};

const createFilmDetailsControls = ({
  isAddedToWatchlist,
  isMarkedAsWatched,
  isFavorite
}) => {

  return `<section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddedToWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isMarkedAsWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>`;
};

const createFilmDetailsCommentsList = (comments) => {

  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${comments.map((comment) => {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${comment.date.toLocaleString(`en-GB`)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }).join(``)}
        </ul>`;
};

const createAddingCommentField = () => {
  return `<div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

const createFilmDetailsTemplate = (film) => {
  const {
    poster,
    description,
    ageRating,
    comments,
  } = film;

  const filmInfoHead = createFilmInfoHead(film);
  const filmDetailsTable = createFilmDetailsTable(film);
  const filmDetailsControls = createFilmDetailsControls(film);
  const filmDetailsCommentsList = createFilmDetailsCommentsList(comments);
  const filmAddingCommentField = createAddingCommentField();

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          ${filmInfoHead}
          ${filmDetailsTable}
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      ${filmDetailsControls}
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${filmDetailsCommentsList}
        ${filmAddingCommentField}
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends AbstractComponentView {
  constructor(filmDetails = TEST_FILM_DETAILS) {
    super();
    this._filmDetails = filmDetails;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._filmDetails);
  }
  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }
}
