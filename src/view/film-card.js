import {showYearFromDate, createElement} from "../utils";
import {generateComment} from "../mock/film";
const MAIN_GENRE = 0;
const TEST_COMMENTS = new Array(3).fill().map(generateComment);

const TEST_FILM = {
  title: `TEST`,
  poster: `./images/posters/made-for-each-other.png`,
  rating: `6+`,
  releaseDate: new Date(),
  duration: `1h 55m`,
  genres: [`Action`, `Comedy`, `Cartoon`],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  comments: TEST_COMMENTS,
  isAddedToWatchlist: false,
  isMarkedAsWatched: false,
  isFavorite: false
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    comments,
    isAddedToWatchlist,
    isMarkedAsWatched,
    isFavorite
  } = film;
  const filmControlItemActiveClass = `film-card__controls-item--active`;
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${showYearFromDate(releaseDate)}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[MAIN_GENRE]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.slice(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${comments.length + ` comments`}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? filmControlItemActiveClass : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkedAsWatched ? filmControlItemActiveClass : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? filmControlItemActiveClass : ``}">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard {
  constructor(film = TEST_FILM) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
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
