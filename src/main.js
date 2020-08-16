import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsListView from "./view/films-list.js";
import FilmCardView from "./view/film-card.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmDetailsView from "./view/film-details";
import NoFilmsView from "./view/no-films";
import {generateFilmDetails} from "./mock/film";
import {render, RenderPosition} from "./utils";
import {getUserRating} from "./mock/user";
import {generateFilter} from "./mock/filter";
import {getTopCommentedFilms, getTopRatedFilms} from "./mock/extra-films";
const bodyElement = document.querySelector(`body`);
const FILMS_COUNT = {
  ALL_MOVIES: 0,
  EXTRA_MOVIES: 2,
};

const FILM_COUNT_PER_STEP = 5;

const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);

const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const filters = generateFilter(allMovies);
const renderFilm = (container, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const closeDetailsButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const onClickShowFilmDetails = () => {
    render(bodyElement, filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onClickCloseFilmDetails = () => {
    filmDetailsComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      onClickCloseFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onClickShowFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onClickShowFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onClickShowFilmDetails);
  closeDetailsButton.addEventListener(`click`, onClickCloseFilmDetails);

  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const fillFilmsContainer = (container, quantity, films) => {
  for (let i = 0; i < quantity; i++) {
    renderFilm(container, films[i]);
  }
};

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, new ProfileView(userRating).getElement());

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, new NavigationView(filters).getElement());
render(siteMainElement, new SortView().getElement());

let filmsListComponent;
if (allMovies.length === 0) {
  filmsListComponent = new NoFilmsView();
} else {
  filmsListComponent = new FilmsListView();
}

render(siteMainElement, filmsListComponent.getElement());

const allFilmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);
const renderNumber = Math.min(allMovies.length, FILM_COUNT_PER_STEP);
fillFilmsContainer(allFilmsListContainerElement, renderNumber, allMovies);

// showMoreButton render
if (allMovies.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());
  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    allMovies
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(allFilmsListContainerElement, film));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= allMovies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

const topCommented = getTopCommentedFilms(allMovies);
if (topCommented.length > 0) {
  render(filmsListComponent.getElement(), new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED).getElement());
  const mostCommentedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
}

const topRated = getTopRatedFilms(allMovies);
if (topRated.length > 0) {
  render(filmsListComponent.getElement(), new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED).getElement());
  const topRatedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
}

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsView(allMovies.length).getElement(), RenderPosition.AFTERBEGIN);
