import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsListView from "./view/films-list.js";
import FilmCardView from "./view/film-card.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmDetailsView from "./view/film-details";
// import LoadingBarView from "./view/loading-bar.js";
import {generateFilmDetails} from "./mock/film";
import {getRandomInteger, renderElement, RenderPosition} from "./utils";
import {getUserRating} from "./mock/user";
import {generateFilter} from "./mock/filter";
import {getTopCommentedFilms, getTopRatedFilms} from "./mock/extra-films";

const FILMS_COUNT = {
  ALL_MOVIES: 25,
  EXTRA_MOVIES: 2,
};

const FILM_COUNT_PER_STEP = 5;

const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);

const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const filters = generateFilter(allMovies);

const fillFilmsContainer = (container, quantity, films) => {
  for (let i = 0; i < quantity; i++) {
    renderElement(container, new FilmCardView(films[i]).getElement());
  }
};

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
renderElement(siteHeaderElement, new ProfileView(userRating).getElement());

const siteMainElement = document.querySelector(`main`);
renderElement(siteMainElement, new NavigationView(filters).getElement());
renderElement(siteMainElement, new SortView().getElement());
const filmsListComponent = new FilmsListView();
renderElement(siteMainElement, filmsListComponent.getElement());

const allFilmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);
const renderNumber = Math.min(allMovies.length, FILM_COUNT_PER_STEP);
fillFilmsContainer(allFilmsListContainerElement, renderNumber, allMovies);

// showMoreButton render
if (allMovies.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();
  renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement());
  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    allMovies
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(allFilmsListContainerElement, new FilmCardView(film).getElement()));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= allMovies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderElement(filmsListComponent.getElement(), new ExtraFilmsListView(EXTRA_FILMS.TOP_RATED).getElement());
renderElement(filmsListComponent.getElement(), new ExtraFilmsListView(EXTRA_FILMS.MOST_COMMENTED).getElement());

const topCommented = getTopCommentedFilms(allMovies);
if (topCommented.length > 0) {
  const mostCommentedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
}

const topRated = getTopRatedFilms(allMovies);
if (topRated.length > 0) {
  const topRatedFilmsContainerElement = filmsListComponent.getElement().lastElementChild.previousElementSibling.querySelector(`.films-list__container`);
  fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
}

const footerStatistics = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

renderElement(bodyElement, new FilmDetailsView(allMovies[0]).getElement());
renderElement(footerStatistics, new FooterStatisticsView(getRandomInteger(100000, 200000)).getElement(), RenderPosition.AFTERBEGIN);
