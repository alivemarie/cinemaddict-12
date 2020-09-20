export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  REMOVE_COMMENT: `REMOVE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  ALL: ``,
  WATCHLIST: `watchlist`,
  WATCHED: `history`,
  FAVORITES: `favorites`
};

export const MenuMode = {
  FILMS: `films`,
  STATISTICS: `statistics`
};

// servers consts

export const AUTHORIZATION = `Basic tralalala`; // `Basic fmsldfn4r3nfsda`, `Basic fmsl423432nda`
export const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const apiHeaders = {"Content-Type": `application/json`};

export const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

// sw consts

const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v12`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
