import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import {getUserRating} from "./mock/user.js";
import FilmsListPresenter from "./presenter/films-list.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FiltersPresenter from "./presenter/filter";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {AUTHORIZATION, END_POINT, UpdateType, STORE_NAME} from "./consts.js";

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, filterModel, apiWithProvider);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, filmsModel, filmsListPresenter);

filmsListPresenter.init();

apiWithProvider.getFilms()
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
  navigator.serviceWorker.register(`./sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
    console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
