import SortView from "../view/sort.js";
import FilmsListView from "../view/films-list.js";
import ExtraFilmsListView from "../view/extra-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../consts.js";
import {getTopCommentedFilms, getTopRatedFilms} from "../mock/extra-films";
import {sortFilmsByRating, sortFilmsByDate} from "../utils/film.js";
import {SortType} from '../consts.js';
import FilmCardPresenter from "./film-card";
import {filter} from "../utils/filter";
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
  constructor(mainContainer, filmsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._filmCardPresenter = {};
    this._filmTopCommentedCardPresenter = {};
    this._filmTopRatedCardPresenter = {};
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();
    this._noFilmComponent = new NoFilmsView();
    this._extraFilmsMostCommentedComponent = new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED);
    this._extraFilmsTopRatedComponent = new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleResetFilmCardDetailsPopups = this._handleResetFilmCardDetailsPopups.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._currentSortType = SortType.DEFAULT;

  }

  init(sortType) {
    this._renderFilmsBoard();
    this._handleSortTypeChange(sortType);
    this._currentSortType = sortType;
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearView(true, true);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filterType = this._filterModel.getFilter();
    const filteredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.slice().sort(sortFilmsByDate);
      case SortType.RATING:
        return filteredFilms.slice().sort(sortFilmsByRating);
    }
    return filteredFilms;
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

  _handleFilmCardChange(updatedFilm) {
    this._filmsModel.updateFilm(null, updatedFilm);

    if (this._filmTopRatedCardPresenter[updatedFilm.id]) {
      this._filmTopRatedCardPresenter[updatedFilm.id].init(updatedFilm);
    }
    if (this._filmTopCommentedCardPresenter[updatedFilm.id]) {
      this._filmTopCommentedCardPresenter[updatedFilm.id].init(updatedFilm);
    }
    if (this._filmCardPresenter[updatedFilm.id]) {
      this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
    }
  }

  _handleModelEvent(updateType, film) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearView();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearView({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
      default:
        this._filmCardPresenter[film.id].init(film);
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearView();
    this._renderFilmsBoard();
  }

  _clearView({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    const clearedPresenters = [this._filmCardPresenter, this._filmTopRatedCardPresenter, this._filmTopCommentedCardPresenter];
    for (let presenters of clearedPresenters) {
      Object
      .values(presenters)
      .forEach((presenter) => presenter.destroy());
      presenters = {};
    }

    if (resetRenderedFilmCount) {
      this._renderedFilmCards = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCards = Math.min(filmCount, this._renderedFilmCards);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

    const removedComponents = [
      this._sortComponent,
      this._filmsListComponent,
      this._noFilmComponent,
      this._showMoreButtonComponent,
      this._extraFilmsMostCommentedComponent,
      this._extraFilmsTopRatedComponent];

    for (let component of removedComponents) {
      remove(component);
    }
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

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilmCard(container, film));
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

  _renderFilmsBoard() {
    this._renderSort();

    if (this._getFilms().length === 0) {
      render(this._mainContainer, this._noFilmComponent);
      return;
    }

    render(this._mainContainer, this._filmsListComponent);

    this._allFilmsListContainerElement = this._filmsListComponent
      .getElement().querySelector(`.films-list__container`);

    if (this._allFilmsListContainerElement) {
      this._renderFilmsIntoMainContainer();
    }

    this._renderTopCommentedFilms();
    this._renderTopRatedFilms();
  }

  _renderFillFilmsContainer(container, quantity, films) {
    for (let i = 0; i < quantity; i++) {
      this._renderFilmCard(container, films[i]);
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
