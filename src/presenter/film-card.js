import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details";
import {render, remove} from "../utils/render.js";

export default class FilmCard {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._bodyElement = document.querySelector(`body`);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmCardComponent.setFilmCommentsClickHandler(this._handleCommentsClick);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    render(this._filmsContainer, this._filmCardComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleCommentsClick() {
    render(this._bodyElement, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCloseButtonClick() {
    this._filmDetailsComponent.getElement().remove();
  }

}
