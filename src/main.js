import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import {getUserRating} from "./mock/user.js";
import FilmsListPresenter from "./presenter/films-list.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FiltersPresenter from "./presenter/filter";
import Api from "./api.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./consts.js";

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, filterModel, api);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, filmsListPresenter);

filmsListPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    filtersPresenter.init();
    render(footerStatistics, new FooterStatisticsView(films.length), RenderPosition.AFTERBEGIN);
    const userRating = getUserRating(filmsModel.getFilms());
    render(siteHeaderElement, new ProfileView(userRating));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    filtersPresenter.init();
    render(footerStatistics, new FooterStatisticsView(`No`));
    const userRating = getUserRating(filmsModel.getFilms());
    render(siteHeaderElement, new ProfileView(userRating));
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
    // Действие, в случае ошибки при регистрации ServiceWorker
    console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});
