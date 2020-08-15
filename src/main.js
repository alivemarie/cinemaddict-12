import ProfileView from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsListView from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createExtraFilmsListTemplate} from "./view/extra-films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details";
// import {createLoadingBarTemplate} from "./view/loading-bar.js";
import {generateFilmDetails} from "./mock/film";
import {getRandomInteger, renderTemplate, renderElement, RenderPosition} from "./utils";
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
    renderTemplate(container, createFilmCardTemplate(films[i]));
  }
};

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
renderElement(siteHeaderElement, new ProfileView(userRating).getElement());

const siteMainElement = document.querySelector(`main`);
renderTemplate(siteMainElement, createNavigationTemplate(filters));
renderElement(siteMainElement, new SortView().getElement());
const filmsListComponent = new FilmsListView();
renderElement(siteMainElement, filmsListComponent.getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
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
      .forEach((film) => renderTemplate(allFilmsListContainerElement, createFilmCardTemplate(film)));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= allMovies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderTemplate(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.TOP_RATED));
renderTemplate(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.MOST_COMMENTED));

const topCommented = getTopCommentedFilms(allMovies);
if (topCommented.length > 0) {
  const mostCommentedFilmsContainerElement = filmsElement.lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
}

const topRated = getTopRatedFilms(allMovies);
if (topRated.length > 0) {
  const topRatedFilmsContainerElement = filmsElement.lastElementChild.previousElementSibling.querySelector(`.films-list__container`);
  fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
}

const footer = document.querySelector(`footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

// renderTemplate(footer, createFilmDetailsTemplate(allMovies[0]), `afterend`);
renderElement(footerStatistics, new FooterStatisticsView(getRandomInteger(100000, 200000)).getElement(), RenderPosition.AFTERBEGIN);
