import {createProfileRatingTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createExtraFilmsListTemplate} from "./view/extra-films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details";
import {render} from "./view/dom-utils.js";
// import {createLoadingBarTemplate} from "./view/loading-bar.js";
import {generateFilmDetails} from "./mock/film";
import {getRandomInteger} from "./utils";
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
    render(container, createFilmCardTemplate(films[i]));
  }
};

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, createProfileRatingTemplate(userRating));

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, createNavigationTemplate(filters));
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createFilmsListTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

const renderNumber = Math.min(allMovies.length, FILM_COUNT_PER_STEP);
fillFilmsContainer(allFilmsListContainerElement, renderNumber, allMovies);
if (allMovies.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  render(allFilmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

  const showMoreButton = filmsElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    allMovies
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(allFilmsListContainerElement, createFilmCardTemplate(film)));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= allMovies.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.TOP_RATED));
render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.MOST_COMMENTED));

const topCommented = getTopCommentedFilms(allMovies);
if (topCommented.length > 0) {
  const mostCommentedFilmsContainerElement = filmsElement.lastElementChild.querySelector(`.films-list__container`);
  fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topRated);
}

const topRated = getTopRatedFilms(allMovies);
if (topRated.length > 0) {
  const topRatedFilmsContainerElement = filmsElement.lastElementChild.previousElementSibling.querySelector(`.films-list__container`);
  fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES, topCommented);
}

const footer = document.querySelector(`footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footer, createFilmDetailsTemplate(allMovies[0]), `afterend`);
render(footerStatistics, createFooterStatisticsTemplate(getRandomInteger(100000, 200000)), `afterbegin`);
