'use strict';

const FILMS_COUNT = {
  ALL_MOVIES: 5,
  EXTRA_MOVIES: 2,
};

const EXTRA_FILMS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const fillFilmsContainer = (container, quantity) => {
  for (let i = 0; i < quantity; i++) {
    render(container, createFilmCardTemplate(), `beforeend`);
  }
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
    `<section class="films">\n` +
    `    <section class="films-list">\n` +
    `      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n` +
    `      <div class="films-list__container">\n` +
    `      </div>\n` +
    `    </section>\n` +
    `  </section>`
  );
};

/* const createLoadingBarTemplate = () => {
  return (
    `<h2 class="films-list__title">Loading...</h2>`
  );
}; */

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

const createFilmDetailsTemplate = () => {
  return (
    `<section class="film-details">\n` +
    `  <form class="film-details__inner" action="" method="get">\n` +
    `    <div class="form-details__top-container">\n` +
    `      <div class="film-details__close">\n` +
    `        <button class="film-details__close-btn" type="button">close</button>\n` +
    `      </div>\n` +
    `      <div class="film-details__info-wrap">\n` +
    `        <div class="film-details__poster">\n` +
    `          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">\n` +
    `\n` +
    `          <p class="film-details__age">18+</p>\n` +
    `        </div>\n` +
    `\n` +
    `        <div class="film-details__info">\n` +
    `          <div class="film-details__info-head">\n` +
    `            <div class="film-details__title-wrap">\n` +
    `              <h3 class="film-details__title">The Great Flamarion</h3>\n` +
    `              <p class="film-details__title-original">Original: The Great Flamarion</p>\n` +
    `            </div>\n` +
    `\n` +
    `            <div class="film-details__rating">\n` +
    `              <p class="film-details__total-rating">8.9</p>\n` +
    `            </div>\n` +
    `          </div>\n` +
    `\n` +
    `          <table class="film-details__table">\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Director</td>\n` +
    `              <td class="film-details__cell">Anthony Mann</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Writers</td>\n` +
    `              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Actors</td>\n` +
    `              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Release Date</td>\n` +
    `              <td class="film-details__cell">30 March 1945</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Runtime</td>\n` +
    `              <td class="film-details__cell">1h 18m</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Country</td>\n` +
    `              <td class="film-details__cell">USA</td>\n` +
    `            </tr>\n` +
    `            <tr class="film-details__row">\n` +
    `              <td class="film-details__term">Genres</td>\n` +
    `              <td class="film-details__cell">\n` +
    `                <span class="film-details__genre">Drama</span>\n` +
    `                <span class="film-details__genre">Film-Noir</span>\n` +
    `                <span class="film-details__genre">Mystery</span></td>\n` +
    `            </tr>\n` +
    `          </table>\n` +
    `\n` +
    `          <p class="film-details__film-description">\n` +
    `            The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.\n` +
    `          </p>\n` +
    `        </div>\n` +
    `      </div>\n` +
    `\n` +
    `      <section class="film-details__controls">\n` +
    `        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">\n` +
    `        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>\n` +
    `\n` +
    `        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">\n` +
    `        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>\n` +
    `\n` +
    `        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">\n` +
    `        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>\n` +
    `      </section>\n` +
    `    </div>\n` +
    `\n` +
    `    <div class="form-details__bottom-container">\n` +
    `      <section class="film-details__comments-wrap">\n` +
    `        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>\n` +
    `\n` +
    `        <ul class="film-details__comments-list">\n` +
    `          <li class="film-details__comment">\n` +
    `            <span class="film-details__comment-emoji">\n` +
    `              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">\n` +
    `            </span>\n` +
    `            <div>\n` +
    `              <p class="film-details__comment-text">Interesting setting and a good cast</p>\n` +
    `              <p class="film-details__comment-info">\n` +
    `                <span class="film-details__comment-author">Tim Macoveev</span>\n` +
    `                <span class="film-details__comment-day">2019/12/31 23:59</span>\n` +
    `                <button class="film-details__comment-delete">Delete</button>\n` +
    `              </p>\n` +
    `            </div>\n` +
    `          </li>\n` +
    `          <li class="film-details__comment">\n` +
    `            <span class="film-details__comment-emoji">\n` +
    `              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">\n` +
    `            </span>\n` +
    `            <div>\n` +
    `              <p class="film-details__comment-text">Booooooooooring</p>\n` +
    `              <p class="film-details__comment-info">\n` +
    `                <span class="film-details__comment-author">John Doe</span>\n` +
    `                <span class="film-details__comment-day">2 days ago</span>\n` +
    `                <button class="film-details__comment-delete">Delete</button>\n` +
    `              </p>\n` +
    `            </div>\n` +
    `          </li>\n` +
    `          <li class="film-details__comment">\n` +
    `            <span class="film-details__comment-emoji">\n` +
    `              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">\n` +
    `            </span>\n` +
    `            <div>\n` +
    `              <p class="film-details__comment-text">Very very old. Meh</p>\n` +
    `              <p class="film-details__comment-info">\n` +
    `                <span class="film-details__comment-author">John Doe</span>\n` +
    `                <span class="film-details__comment-day">2 days ago</span>\n` +
    `                <button class="film-details__comment-delete">Delete</button>\n` +
    `              </p>\n` +
    `            </div>\n` +
    `          </li>\n` +
    `          <li class="film-details__comment">\n` +
    `            <span class="film-details__comment-emoji">\n` +
    `              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">\n` +
    `            </span>\n` +
    `            <div>\n` +
    `              <p class="film-details__comment-text">Almost two hours? Seriously?</p>\n` +
    `              <p class="film-details__comment-info">\n` +
    `                <span class="film-details__comment-author">John Doe</span>\n` +
    `                <span class="film-details__comment-day">Today</span>\n` +
    `                <button class="film-details__comment-delete">Delete</button>\n` +
    `              </p>\n` +
    `            </div>\n` +
    `          </li>\n` +
    `        </ul>\n` +
    `\n` +
    `        <div class="film-details__new-comment">\n` +
    `          <div for="add-emoji" class="film-details__add-emoji-label"></div>\n` +
    `\n` +
    `          <label class="film-details__comment-label">\n` +
    `            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>\n` +
    `          </label>\n` +
    `\n` +
    `          <div class="film-details__emoji-list">\n` +
    `            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">\n` +
    `            <label class="film-details__emoji-label" for="emoji-smile">\n` +
    `              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">\n` +
    `            </label>\n` +
    `\n` +
    `            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">\n` +
    `            <label class="film-details__emoji-label" for="emoji-sleeping">\n` +
    `              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">\n` +
    `            </label>\n` +
    `\n` +
    `            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">\n` +
    `            <label class="film-details__emoji-label" for="emoji-puke">\n` +
    `              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">\n` +
    `            </label>\n` +
    `\n` +
    `            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">\n` +
    `            <label class="film-details__emoji-label" for="emoji-angry">\n` +
    `              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">\n` +
    `            </label>\n` +
    `          </div>\n` +
    `        </div>\n` +
    `      </section>\n` +
    `    </div>\n` +
    `  </form>\n` +
    `</section>`
  );
};

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
fillFilmsContainer(allFilmsListContainerElement, FILMS_COUNT.ALL_MOVIES);

render(allFilmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.TOP_RATED), `beforeend`);
render(filmsElement, createExtraFilmsListTemplate(EXTRA_FILMS.MOST_COMMENTED), `beforeend`);

const topRatedFilmsContainerElement = filmsElement.lastElementChild.previousElementSibling.querySelector(`.films-list__container`);
const mostCommentedFilmsContainerElement = filmsElement.lastElementChild.querySelector(`.films-list__container`);

fillFilmsContainer(topRatedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES);
fillFilmsContainer(mostCommentedFilmsContainerElement, FILMS_COUNT.EXTRA_MOVIES);

const footer = document.querySelector(`footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footer, createFilmDetailsTemplate(), `afterend`);
render(footerStatistics, createFooterStatisticsTemplate(), `afterbegin`);
