const START_INDEX = 0;
const ITEMS_QUANTITY = 2;

const getTopCommentedFilms = (films) => {
  const sortedFilmsByComments = films.slice().sort((firstItem, secondItem) => secondItem.comments.length - firstItem.comments.length);
  const topCommented = sortedFilmsByComments.filter((film) => film.comments.length > 0);
  return topCommented.splice(START_INDEX, ITEMS_QUANTITY);
};

const getTopRatedFilms = (films) => {
  const sortedFilmsByComments = films.slice().sort((firstItem, secondItem) => secondItem.rating - firstItem.rating);
  const topRated = sortedFilmsByComments.filter((film) => film.rating > 0);
  return topRated.splice(START_INDEX, ITEMS_QUANTITY);
};

export {getTopCommentedFilms, getTopRatedFilms};
