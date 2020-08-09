const filmsToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.isAddedToWatchlist).length,
  history: (films) => films
    .filter((film) => film.isMarkedAsWatched).length,
  favorites: (films) => films
    .filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
