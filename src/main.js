'use strict';
const FILMS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createProfileRatingTemplate = () => {
  return (
    `<section class="header__profile profile">\n` +
    `    <p class="profile__rating">Movie Buff</p>\n` +
    `    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">\n` +
    `  </section>`
  );
};

const createNavigationTemplate = () => {
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

const createSortingTemplate = () => {
  return (
    `<ul class="sort">\n` +
    `    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>\n` +
    `    <li><a href="#" class="sort__button">Sort by date</a></li>\n` +
    `    <li><a href="#" class="sort__button">Sort by rating</a></li>\n` +
    `  </ul>`
  );
};

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">\n` +
    `      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n` +
    `      <div class="films-list__container">\n` +
    `      </div>\n` +
    `    </section>`
  );
};

const createLoadingBarTemplate = () => {
  return (
    `<h2 class="films-list__title">Loading...</h2>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">\n` +
    `          <h3 class="film-card__title">Sagebrush Trail</h3>\n` +
    `          <p class="film-card__rating">3.2</p>\n` +
    `          <p class="film-card__info">\n` +
    `            <span class="film-card__year">1933</span>\n` +
    `            <span class="film-card__duration">54m</span>\n` +
    `            <span class="film-card__genre">Western</span>\n` +
    `          </p>\n` +
    `          <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">\n` +
    `          <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>\n` +
    `          <a class="film-card__comments">89 comments</a>\n` +
    `          <form class="film-card__controls">\n` +
    `            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>\n` +
    `            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>\n` +
    `            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>\n` +
    `          </form>\n` +
    `        </article>`
  );
};

const createExtraFilmsListTemplate = (extraHeader) => {
  return (
    `<section class="films-list--extra">\n      <h2 class="films-list__title">` +
      extraHeader +
      `</h2>\n` +
      `      <div class="films-list__container">\n` +
      `      </div>\n` +
      `    </section>`
  );
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFooterStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

