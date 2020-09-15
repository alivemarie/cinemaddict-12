import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {generateFilmDetails} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import {getUserRating} from "./mock/user.js";
import FilmsListPresenter from "./presenter/films-list.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FiltersPresenter from "./presenter/filter";
import StatisticsView from "./view/statistics";
import Api from "./api.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./consts.js";

const api = new Api(END_POINT, AUTHORIZATION);

const FILMS_COUNT = {
  ALL_MOVIES: 10,
  EXTRA_MOVIES: 2,
};

const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);

const filmsModel = new FilmsModel();

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, new ProfileView(userRating));

const siteMainElement = document.querySelector(`main`);
const filterModel = new FilterModel();
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, filterModel, api);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, filmsListPresenter);

filmsListPresenter.init();

const footerStatistics = document.querySelector(`.footer__statistics`);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    filtersPresenter.init();
    render(footerStatistics, new FooterStatisticsView(films.length), RenderPosition.AFTERBEGIN);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    filtersPresenter.init();
    render(footerStatistics, new FooterStatisticsView(`No`));
  });
