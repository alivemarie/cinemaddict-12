import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details";
import {render, remove, replace} from "../utils/render.js";

export default class FilmCard {
  constructor(filmsContainer, changeData) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;
    this._bodyElement = document.querySelector(`body`);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmCardComponent.setFilmCommentsClickHandler(this._handleCommentsClick);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmsContainer, this._filmCardComponent);
      return;
    }

    if (this._filmsContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._bodyElement.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isMarkedAsWatched: !this._film.isMarkedAsWatched
            }
        )
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isAddedToWatchlist: !this._film.isAddedToWatchlist
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleCommentsClick() {
    render(this._bodyElement, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCloseButtonClick(film) {
    remove(this._filmDetailsComponent);
    this._changeData(film);
    console.log(`changedata вызван`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

}
