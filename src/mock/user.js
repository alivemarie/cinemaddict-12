export const getUserRating = (films) => {
  return films.filter((film) => film.isFavorite).length;
};
