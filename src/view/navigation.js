import AbstractComponentView from "./abstract-component.js";

const createNavigationTemplate = (data, currentFilterType) => {
  const {watchlist, favorites, watched, all} = data;
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${!currentFilterType ? `main-navigation__item--active` : ``}" data-board-type="films" data-filter-type="${all.type}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${currentFilterType === watchlist.type ? `main-navigation__item--active` : ``}" data-board-type="films" data-filter-type="${watchlist.type}">Watchlist <span class="main-navigation__item-count"">${watchlist.count}</span></a>
        <a href="#history" class="main-navigation__item ${currentFilterType === watched.type ? `main-navigation__item--active` : ``}" data-board-type="films" data-filter-type="${watched.type}">History <span class="main-navigation__item-count">${watched.count}</span></a>
        <a href="#favorites" class="main-navigation__item ${currentFilterType === favorites.type ? `main-navigation__item--active` : ``}" data-board-type="films" data-filter-type="${favorites.type}">Favorites <span class="main-navigation__item-count">${favorites.count}</span></a>
      </div>
      <a href="#stats" data-board-type="statistics" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class Navigation extends AbstractComponentView {
  constructor(data, currentFilterType) {
    super();

    this._data = data;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this._data, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback(evt.target.dataset.filterType);
  }

  setFiltersTypeChangeHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector(`.main-navigation__items`)
      .addEventListener(`click`, this._filterTypeChangeHandler);
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.boardType, evt.target.dataset.filterType);

  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`)
      .addEventListener(`click`, this._menuClickHandler);
    this.getElement().querySelector(`.main-navigation__items`)
      .addEventListener(`click`, this._menuClickHandler);
  }
}
