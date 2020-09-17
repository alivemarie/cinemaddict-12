import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          title: film.film_info.title,
          titleOriginal: film.film_info.alternative_title,
          poster: film.film_info.poster,
          rating: film.film_info.total_rating,
          director: film.film_info.director,
          writers: film.film_info.writers.join(`, `),
          actors: film.film_info.actors.join(`, `),
          releaseDate: new Date(film.film_info.release.date),
          duration: film.film_info.runtime,
          country: film.film_info.release.release_country,
          genres: film.film_info.genre,
          description: film.film_info.description,
          ageRating: film.film_info.age_rating,
          commentsIds: film.comments,
          comments: [],
          isAddedToWatchlist: film.user_details.watchlist,
          isMarkedAsWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.already_watched;
    delete adaptedFilm.favorite;
    delete adaptedFilm.watchlist;
    delete adaptedFilm.user_details;
    delete adaptedFilm.age_rating;
    delete adaptedFilm.alternative_title;
    delete adaptedFilm.film_info;
    delete adaptedFilm.watching_date;
    delete adaptedFilm.total_rating;
    delete adaptedFilm.release;
    delete adaptedFilm.genre;

    return adaptedFilm;

  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "comments": film.commentsIds,
          "user_details": {
            "already_watched": film.isMarkedAsWatched,
            "favorite": film.isFavorite,
            "watchlist": film.isAddedToWatchlist,
            "watching_date": film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null
          },
          "film_info": {
            "description": film.description,
            "director": film.director,
            "actors": film.actors.split(`,`),
            "writers": film.writers.split(`,`),
            "alternative_title": film.titleOriginal,
            "age_rating": film.ageRating,
            "total_rating": film.rating,
            "release": {
              "release_country": film.country,
              "date": film.releaseDate.toISOString(),
            },
            "genre": film.genres,
            "poster": film.poster,
            "runtime": film.duration,
            "title": film.title
          }
        }
    );

    delete adaptedFilm.isFavorite;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.genres;
    delete adaptedFilm.poster;
    delete adaptedFilm.duration;
    delete adaptedFilm.total_rating;
    delete adaptedFilm.release;
    delete adaptedFilm.genre;
    delete adaptedFilm.title;
    delete adaptedFilm.isAddedToWatchlist;
    delete adaptedFilm.isMarkedAsWatched;
    delete adaptedFilm.country;
    delete adaptedFilm.date;
    delete adaptedFilm.country;
    delete adaptedFilm.rating;
    delete adaptedFilm.age;
    delete adaptedFilm.titleOriginal;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.watching_date;

    return adaptedFilm;
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting films`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, updateFilm, commentId) {
    const filmIndex = this._films.findIndex((film) => film.id === updateFilm.id);
    const commentIndex = updateFilm.comments.findIndex((comment) => comment.id === commentId);

    if (filmIndex === -1) {
      throw new Error(`Can't update unexisting films`);
    }

    this._films[filmIndex] = Object.assign({}, this._films[filmIndex], {
      comments: [
        ...this._films.slice()[filmIndex].comments.slice(0, commentIndex),
        ...this._films.slice()[filmIndex].comments.slice(commentIndex + 1)
      ]
    });

    this._notify(updateType, updateFilm);
  }

  addComment(updateType, updateFilm, newComments) {
    const filmIndex = this._films.findIndex((film) => film.id === updateFilm.id);

    this._films[filmIndex].comments = newComments;

    this._notify(updateType, updateFilm);
  }
}
