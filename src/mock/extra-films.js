const FIRST_ITEM = 0;
const SECOND_ITEM = 1;

const getTopCommentedFilms = (films) => {
  const sortedFilmsByComments = films.slice().sort((firstItem, secondItem) => secondItem.comments.length - firstItem.comments.length);
  const topCommented = [];
  if (sortedFilmsByComments[FIRST_ITEM].comments.length > 0) {
    topCommented.push(sortedFilmsByComments[FIRST_ITEM]);
  }
  if (sortedFilmsByComments[SECOND_ITEM].comments.length > 0) {
    topCommented.push(sortedFilmsByComments[SECOND_ITEM]);
  }
  return topCommented;
};

const getTopRatedFilms = (films) => {
  const sortedFilmsByComments = films.slice().sort((firstItem, secondItem) => secondItem.rating - firstItem.rating);
  const topRated = [];
  if (sortedFilmsByComments[FIRST_ITEM].rating > 0) {
    topRated.push(sortedFilmsByComments[FIRST_ITEM]);
  }
  if (sortedFilmsByComments[SECOND_ITEM].rating > 0) {
    topRated.push(sortedFilmsByComments[SECOND_ITEM]);
  }
  return topRated;
};

export {getTopCommentedFilms, getTopRatedFilms};
