import SortView from "../view/sort.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card.js";
import ExtraFilmsListView from "../view/extra-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmDetailsView from "../view/film-details";
import NoFilmsView from "../view/no-films.js";
import {render, RenderPosition} from "../utils/render.js";
const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;

    this._sortComponent = new SortView();
    this._filmListComponent = new FilmsListView();
    this._filmCardComponent = new FilmCardView();
    this._filmDetailsComponent = new FilmDetailsView();
    this._extraFilmListComponent = new ExtraFilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
  }

  init(films) {
    this._films = films.slice();
  }

  _renderSort() {

  }

  _renderFilmCard() {

  }

  _renderFilmDetails() {

  }

  _renderFilms() {

  }

  _renderNoFilms() {

  }

  _renderShowMoreButton() {

  }

  _renderExtraFilms() {

  }
}
