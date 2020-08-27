import SortView from "../view/sort.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card.js";
import ExtraFilmsListView from "../view/extra-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmDetailsView from "../view/film-details";
import NoFilmsView from "../view/no-films.js";
import {render} from "../utils/render.js";
import NavigationView from "../view/navigation";
import {generateFilter} from "../mock/filter";
import {getTopCommentedFilms, getTopRatedFilms} from "../mock/extra-films";
const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = {
  ALL_MOVIES: 30,
  EXTRA_MOVIES: 2,
};
const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;

    this._sortComponent = new SortView();
  }

  init(films) {
    this._films = films.slice();
    this._renderNavigation(this._films);
    this._renderSort();
    this._renderMainFilmsListContainer(this._films);
    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton(this._films);
    }
    this._renderExtraFilms(films);
  }

  _renderNavigation(films) {
    const filters = generateFilter(films);
    render(this._mainContainer, new NavigationView(filters));
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
  }

  _renderFilmCard(container, film) {
    const bodyElement = document.querySelector(`body`);
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        filmDetailsComponent.getElement().remove();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setFilmCommentsClickHandler(() => {
      render(bodyElement, filmDetailsComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmDetailsComponent.setCloseButtonClickHandler(() => {
      filmDetailsComponent.getElement().remove();
    });

    render(container, filmCardComponent);
  }

  _renderFilms(container, quantity, films) {
    for (let i = 0; i < quantity; i++) {
      this._renderFilmCard(container, films[i]);
    }
  }

  _renderMainFilmsListContainer(films) {
    if (films.length === 0) {
      this._filmsListComponent = new NoFilmsView();
    } else {
      this._filmsListComponent = new FilmsListView();
    }

    render(this._mainContainer, this._filmsListComponent);

    this._allFilmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    if (this._allFilmsListContainerElement) {
      const renderNumber = Math.min(films.length, FILM_COUNT_PER_STEP);
      this._renderFilms(this._allFilmsListContainerElement, renderNumber, films);
    }
  }

  _renderShowMoreButton(films) {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButtonComponent);
    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilmCard(this._allFilmsListContainerElement, film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderExtraFilms(films) {
    const topCommented = getTopCommentedFilms(films);
    if (topCommented.length > 0) {
      render(this._filmsListComponent, new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED));
      const mostCommentedFilmsContainerElement = this._filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
      this._renderFilms(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
    }

    const topRated = getTopRatedFilms(films);
    if (topRated.length > 0) {
      render(this._filmsListComponent, new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED));
      const topRatedFilmsContainerElement = this._filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
      this._renderFilms(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
    }
  }
}
