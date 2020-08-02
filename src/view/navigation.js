export const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">\n` +
    `    <div class="main-navigation__items">\n` +
    `      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>\n` +
    `      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>\n` +
    `      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>\n` +
    `      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>\n` +
    `    </div>\n` +
    `    <a href="#stats" class="main-navigation__additional">Stats</a>\n` +
    `  </nav>`
  );
};
