import {createProfileRatingTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createExtraFilmsListTemplate} from "./view/extra-films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
// import {createFilmDetailsTemplate} from "./view/film-details";
import {render} from "./view/dom-utils.js";
// import {createLoadingBarTemplate} from "./view/loading-bar.js";
import {generateFilmDetails} from "./mock/film";

const FILMS_COUNT = {
  ALL_MOVIES: 5,
  EXTRA_MOVIES: 2,
};
const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);

const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const fillFilmsContainer = (container, quantity, films) => {
  for (let i = 0; i < quantity; i++) {
    render(container, createFilmCardTemplate(films[i]));
  }
};

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createProfileRatingTemplate());

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createFilmsListTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
fillFilmsContainer(allFilmsListContainerElement, FILMS_COUNT.ALL_MOVIES, allMovies);

render(allFilmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

const extraMovies = new Array(FILMS_COUNT.EXTRA_MOVIES).fill().map(generateFilmDetails);
render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.TOP_RATED));
render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.MOST_COMMENTED));

const topRatedFilmsContainerElement = filmsElement.lastElementChild.previousElementSibling.querySelector(`.films-list__container`);
const mostCommentedFilmsContainerElement = filmsElement.lastElementChild.querySelector(`.films-list__container`);

fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, extraMovies);
fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, extraMovies);

const footer = document.querySelector(`footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

// render(footer, createFilmDetailsTemplate(), `afterend`);
render(footerStatistics, createFooterStatisticsTemplate(), `afterbegin`);
