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

const AUTHORIZATION = `Basic fmsldfn4r3nfsda`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms().then((films) => {
  console.log(films[0]);
});

const FILMS_COUNT = {
  ALL_MOVIES: 10,
  EXTRA_MOVIES: 2,
};

const allMovies = new Array(FILMS_COUNT.ALL_MOVIES).fill().map(generateFilmDetails);
console.log(allMovies[0]);

const filmsModel = new FilmsModel();
filmsModel.setFilms(allMovies);

const siteHeaderElement = document.querySelector(`header`);
const userRating = getUserRating(allMovies);
render(siteHeaderElement, new ProfileView(userRating));

const siteMainElement = document.querySelector(`main`);
const filterModel = new FilterModel();
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, filterModel);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, filmsListPresenter);

filtersPresenter.init();
filmsListPresenter.init();

const statisticsComponent = new StatisticsView(filmsModel.getFilms());
// render(siteMainElement, statisticsComponent);

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsView(allMovies.length), RenderPosition.AFTERBEGIN);
