import {FilterType} from "../consts.js";

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isMarkedAsWatched),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isAddedToWatchlist)
};
