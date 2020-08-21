import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsListView from "./view/films-list.js";
import FilmCardView from "./view/film-card.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmDetailsView from "./view/film-details";
import NoFilmsView from "./view/no-films.js";
import {generateFilmDetails} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import {getUserRating} from "./mock/user.js";
import {generateFilter} from "./mock/filter.js";
import {getTopCommentedFilms, getTopRatedFilms} from "./mock/extra-films.js";
const bodyElement = document.querySelector(`body`);
const FILMS_COUNT = {
  ALL_MOVIES: 30,
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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.setFilmCommentsClickHandler(() => {
    render(bodyElement, filmDetailsComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    filmDetailsComponent.getElement().remove();
  });

  render(container, filmComponent);
};

const fillFilmsContainer = (container, quantity, films) => {
  for (let i = 0; i < quantity; i++) {
    renderFilm(container, films[i]);
  }
};

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, new ProfileView(userRating));

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, new NavigationView(filters));
render(siteMainElement, new SortView());

let filmsListComponent;
if (allMovies.length === 0) {
  filmsListComponent = new NoFilmsView();
} else {
  filmsListComponent = new FilmsListView();
}

render(siteMainElement, filmsListComponent);

const allFilmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);
const renderNumber = Math.min(allMovies.length, FILM_COUNT_PER_STEP);
fillFilmsContainer(allFilmsListContainerElement, renderNumber, allMovies);

// showMoreButton render
if (allMovies.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsListComponent, showMoreButtonComponent);
  showMoreButtonComponent.setClickHandler(() => {
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
  render(filmsListComponent, new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED));
  const mostCommentedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
}

const topRated = getTopRatedFilms(allMovies);
if (topRated.length > 0) {
  render(filmsListComponent, new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED));
  const topRatedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
}

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsView(allMovies.length), RenderPosition.AFTERBEGIN);
