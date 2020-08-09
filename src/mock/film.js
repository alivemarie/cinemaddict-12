import {getRandomInteger} from "../utils";
import {
  AGE_RATINGS,
  ACTORS,
  SCREENWRITERS,
  FILM_DIRECTORS,
  DURATIONS,
  POSTERS,
  FILM_NAME,
  COMMENT_AUTHOR,
  COMMENT_EMOJI,
  COMMENT_TEXT,
  DESCRIPTION,
  FILM_GENRE,
  COUNTRIES
} from "../consts";
const COMMENTS = {
  min: 2,
  max: 5
};
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomItem = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

const getFewRandomItems = (items, max) => {
  const randomIndex = getRandomInteger(1, max);
  const randomItems = items.slice().sort(() => Math.random() - 0.5);
  randomItems.splice(randomIndex, randomItems.length - randomIndex);
  return randomItems;
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENT_TEXT),
    emoji: getRandomItem(COMMENT_EMOJI),
    author: getRandomItem(COMMENT_AUTHOR),
    date: randomDate(new Date(2012, 0, 1), new Date())
  };
};

export const generateFilmDetails = () => {
  const title = getRandomItem(FILM_NAME);
  const titleOriginal = title;
  const poster = getRandomItem(POSTERS);
  const rating = (Math.random() * 10).toFixed(1);
  const duration = getRandomItem(DURATIONS);
  const director = getRandomItem(FILM_DIRECTORS);
  const country = getRandomItem(COUNTRIES);
  const ageRating = getRandomItem(AGE_RATINGS);
  const writers = getFewRandomItems(SCREENWRITERS, 3).join(`, `);
  const actors = getFewRandomItems(ACTORS, 5).join(`, `);
  const genres = getFewRandomItems(FILM_GENRE, 3);
  const description = getFewRandomItems(DESCRIPTION, 5).join(` `);
  const releaseDate = randomDate(new Date(1960, 0, 1), new Date());
  const commentNumber = getRandomInteger(COMMENTS.min, COMMENTS.max);
  const comments = new Array(commentNumber).fill().map(generateComment);
  const isAddedToWatchlist = Boolean(getRandomInteger(0, 1));
  const isMarkedAsWatched = Boolean(getRandomInteger(0, 1));
  const isFavorite = Boolean(getRandomInteger(0, 1));
  return {
    title,
    titleOriginal,
    poster,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres,
    description,
    ageRating,
    comments,
    isAddedToWatchlist,
    isMarkedAsWatched,
    isFavorite
  };
};

