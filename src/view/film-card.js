import {showYearFromDate, showFilmDuration} from "../utils/film.js";
import AbstractComponentView from "./abstract-component.js";
const MAIN_GENRE = 0;

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    commentsIds,
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
            <span class="film-card__duration">${showFilmDuration(duration)}</span>
            <span class="film-card__genre">${genres.length > 0 ? genres[MAIN_GENRE] : ``}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.slice(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${commentsIds.length + ` comments`}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? filmControlItemActiveClass : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkedAsWatched ? filmControlItemActiveClass : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? filmControlItemActiveClass : ``}">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard extends AbstractComponentView {
  constructor(film) {
    super();
    this._film = film;
    this._filmCommentsClickHandler = this._filmCommentsClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  setFilmCommentsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._filmCommentsClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._filmCommentsClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._filmCommentsClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _filmCommentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
