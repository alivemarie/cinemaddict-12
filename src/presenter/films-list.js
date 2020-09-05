import SortView from "../view/sort.js";
import FilmsListView from "../view/films-list.js";
import ExtraFilmsListView from "../view/extra-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import {render, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import NavigationView from "../view/navigation";
import {generateFilter} from "../mock/filter";
import {getTopCommentedFilms, getTopRatedFilms} from "../mock/extra-films";
import {sortFilmsByRating, sortFilmsByDate} from "../utils/film.js";
import {SortType} from '../consts.js';
import FilmCardPresenter from "./film-card";
const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = {
  ALL_MOVIES: 30,
  EXTRA_MOVIES: 2,
};
const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class FilmsList {
  constructor(mainContainer, filmsModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;

    this._filmCardPresenter = {};
    this._filmTopCommentedCardPresenter = {};
    this._filmTopRatedCardPresenter = {};
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();
    this._extraFilmsMostCommentedComponent = new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED);
    this._extraFilmsTopRatedComponent = new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleResetFilmCardDetailsPopups = this._handleResetFilmCardDetailsPopups.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._renderNavigation(this._films);
    this._renderSort();
    this._renderAllFilmsListContainer();
    if (this._allFilmsListContainerElement) {
      this._renderFilmsIntoMainContainer();
    }

    this._renderTopCommentedFilms();
    this._renderTopRatedFilms();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByDate);
    }
    return this._filmsModel.getFilms();
  }

  _handleResetFilmCardDetailsPopups() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetDetails());
    Object
      .values(this._filmTopCommentedCardPresenter)
      .forEach((presenter) => presenter.resetDetails());
    Object
      .values(this._filmTopRatedCardPresenter)
      .forEach((presenter) => presenter.resetDetails());
  }

  _renderNavigation(films) {
    const filters = generateFilter(films);
    render(this._mainContainer, new NavigationView(filters));
  }

  _handleFilmCardChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    if (this._filmTopRatedCardPresenter[updatedFilm.id]) {
      this._filmTopRatedCardPresenter[updatedFilm.id].init(updatedFilm);
    }
    if (this._filmTopCommentedCardPresenter[updatedFilm.id]) {
      this._filmTopCommentedCardPresenter[updatedFilm.id].init(updatedFilm);
    }
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmCardsList(this._filmCardPresenter);
    this._clearFilmCardsList(this._filmTopRatedCardPresenter);
    this._clearFilmCardsList(this._filmTopCommentedCardPresenter);
    this._renderFilmsIntoMainContainer();
    this._renderTopCommentedFilms();
    this._renderTopRatedFilms();
  }

  _clearFilmCardsList(presenters) {
    Object
      .values(presenters)
      .forEach((presenter) => presenter.destroy());
    presenters = {};
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(container, film) {
    const filmCardPresenter = new FilmCardPresenter(container, this._handleFilmCardChange, this._handleResetFilmCardDetailsPopups);
    filmCardPresenter.init(film);
    switch (container) {
      case this._mostCommentedFilmsContainerElement:
        this._filmTopCommentedCardPresenter[film.id] = filmCardPresenter;
        break;
      case this._topRatedFilmsContainerElement:
        this._filmTopRatedCardPresenter[film.id] = filmCardPresenter;
        break;
      default:
        this._filmCardPresenter[film.id] = filmCardPresenter;
    }
  }

  _renderFillFilmsContainer(container, quantity, films) {
    for (let i = 0; i < quantity; i++) {
      this._renderFilmCard(container, films[i]);
    }
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilmCard(container, film));
  }

  _renderAllFilmsListContainer() {
    if (this._getFilms().length === 0) {
      this._filmsListComponent = new NoFilmsView();
    } else {
      this._filmsListComponent = new FilmsListView();
    }
    render(this._mainContainer, this._filmsListComponent);

    this._allFilmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
  }

  _renderFilmsIntoMainContainer() {
    const filmsNumber = this._getFilms().length;
    const renderNumber = Math.min(filmsNumber, FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(0, renderNumber);
    this._renderFilms(this._allFilmsListContainerElement, films);
    this._renderedFilmCards = renderNumber;
    if (filmsNumber > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const filmsNumber = this._getFilms().length;
    const updatedRenderedFilmsCount = Math.min(filmsNumber, this._renderedFilmCards + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCards, updatedRenderedFilmsCount);

    this._renderFilms(this._allFilmsListContainerElement, films);
    this._renderedFilmCards = updatedRenderedFilmsCount;

    if (this._renderedFilmCards >= filmsNumber) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderTopCommentedFilms() {
    const topCommented = getTopCommentedFilms(this._getFilms().slice());
    if (topCommented.length > 0) {
      render(this._filmsListComponent, this._extraFilmsMostCommentedComponent);
      this._mostCommentedFilmsContainerElement = this._filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
      this._renderFillFilmsContainer(this._mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
    }
  }

  _renderTopRatedFilms() {
    const topRated = getTopRatedFilms(this._getFilms().slice());
    if (topRated.length > 0) {
      render(this._filmsListComponent, this._extraFilmsTopRatedComponent);
      this._topRatedFilmsContainerElement = this._filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
      this._renderFillFilmsContainer(this._topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
    }
  }
}
