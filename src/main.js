import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {generateFilmDetails} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import {getUserRating} from "./mock/user.js";
import FilmsListPresenter from "./presenter/films-list.js";
import FilmsModel from "./model/films.js";

const FILMS_COUNT = {
  ALL_MOVIES: 30,
  EXTRA_MOVIES: 2,
};

const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);
const filmsModel = new FilmsModel();
filmsModel.setFilms(allMovies);

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, new ProfileView(userRating));

const siteMainElement = document.querySelector(`main`);
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel);
filmsListPresenter.init();

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsView(allMovies.length), RenderPosition.AFTERBEGIN);
