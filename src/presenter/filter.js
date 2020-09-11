import {render, RenderPosition, remove, replace} from "../utils/render.js";
import Navigation from "../view/navigation.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType, MenuMode} from "../consts.js";
import StatisticsView from "../view/statistics";
import {SortType} from "../consts";

export default class FiltersPresenter {
  constructor(container, filtersModel, filmsModel, filmsListPresenter) {
    this._container = container;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._filters = this._filtersModel.getFilter();
    this._filmsListPresenter = filmsListPresenter;
    this._filtersComponent = null;
    this._currentFiltersType = null;
    this._currentMenuMode = MenuMode.FILMS;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFiltersTypeChange = this._handleFiltersTypeChange.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }
  init() {
    this._currentFiltersType = this._filtersModel.getFilter();

    const filters = this._getFilters();
    const prevFiltersComponent = this._filtersComponent;

    this._filtersComponent = new Navigation(filters, this._currentFiltersType);

    // this._filtersComponent.setFiltersTypeChangeHandler(this._handleFiltersTypeChange);
    this._filtersComponent.setMenuClickHandler(this._handleSiteMenuClick);

    if (prevFiltersComponent === null) {
      render(this._container, this._filtersComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFiltersTypeChange(filtersType) {
    if (this._currentFilter === filtersType) {
      return;
    }
    console.log(filtersType);
    this._filtersModel.setFilter(UpdateType.MAJOR, filtersType);
  }

  _handleSiteMenuClick(menuItem, filtersType = null) {
    console.log(menuItem);
    switch (menuItem) {
      case MenuMode.STATISTICS:
        this._currentMenuMode = MenuMode.STATISTICS;
        this._statisticBoard = new StatisticsView(this._filmsModel.getFilms());
        this._statisticBoard.setPeriodClickHandler();
        render(document.querySelector(`main`), this._statisticBoard);
        this._filmsListPresenter.destroy(true, true);
        break;
      default:
        this._currentMenuMode = MenuMode.FILMS;
        if (this._statisticBoard) {
          remove(this._statisticBoard);
        }
        if (this._currentFilter === filtersType) {
          return;
        }
        this._filmsListPresenter.init(SortType.DEFAULT);
        this._filtersModel.setFilter(UpdateType.MAJOR, filtersType);
        break;
    }
    this._handleModelEvent();
  }

  getWatchedCount() {
    return this._getFilters().watched.count;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return {
      all: {
        type: FilterType.ALL,
        name: ``,
        count: filter[FilterType.ALL](films).length
      },
      favorites: {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      },
      watchlist: {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      watched: {
        type: FilterType.WATCHED,
        name: `Watched`,
        count: filter[FilterType.WATCHED](films).length
      },
    };
  }

  destroy() {
    remove(this._filtersComponent);
  }
}
