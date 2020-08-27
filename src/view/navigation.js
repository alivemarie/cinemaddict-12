import AbstractView from "./abstract";
const TEST_FILTERS = new Array(3).fill().map(() => {
  return {
    name: `testFilterName`,
    count: `0`
  };
});

const createNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filters.map((filter) => {
    return `<a href="#${filter.name}" class="main-navigation__item">${filter.name.toUpperCase()}
<span class="main-navigation__item-count">${filter.count}</span></a>`;
  }).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Navigation extends AbstractView {
  constructor(filters = TEST_FILTERS) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }
}
