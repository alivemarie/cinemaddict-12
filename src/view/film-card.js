export const createFilmCardTemplate = () => {
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
