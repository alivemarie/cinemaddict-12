import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details";
import {render, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../consts.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

export const Error = {
  ADDING: `ADDING`,
  DELETING: `DELETING`
};

export default class FilmCard {
  constructor(filmsContainer, changeData, resetFilmCardDetailsPopups, api) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;
    this._resetFilmCardDetailsPopups = resetFilmCardDetailsPopups;
    this._api = api;
    this._mode = Mode.DEFAULT;
    this._isAddAborted = false;
    this._bodyElement = document.querySelector(`body`);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setFilmCommentsClickHandler(this._handleCommentsClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);

    if (prevFilmCardComponent === null) {
      render(this._filmsContainer, this._filmCardComponent);
      return;
    }

    if (this._filmsContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (prevFilmDetailsComponent) {
      remove(prevFilmDetailsComponent);
    }
    if (prevFilmCardComponent) {
      remove(prevFilmCardComponent);
    }

    if (this._mode === Mode.DETAILS) {
      this._renderFilmDetailsComponent();
    }
  }

  destroy() {
    if (this._filmCardComponent) {
      remove(this._filmCardComponent);
    }
    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent);
    }
  }

  setErrorHandler(error) {
    if (error === Error.ADDING) {
      this._filmDetailsComponent.setFormErrorHandler();
    }
    if (error === Error.DELETING) {
      this._filmDetailsComponent.setDeleteErrorHandler();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isMarkedAsWatched: !this._film.isMarkedAsWatched
            }
        )
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isAddedToWatchlist: !this._film.isAddedToWatchlist
            }
        )
    );
  }

  resetDetails() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }

  _closeDetails() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeDetails();
    }
  }

  _renderFilmDetailsComponent() {
    this._resetFilmCardDetailsPopups();
    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    this._filmDetailsComponent.setCommentsDeleteHandler(this._handleDeleteCommentClick);
    this._filmDetailsComponent.setCommentSubmitHandler(this._handleFormSubmit, this._isAddAborted);
    this._filmDetailsComponent.enableIsWatchedToggler(this._changeData);
    this._filmDetailsComponent.enableIsFavoriteToggler(this._changeData);
    this._filmDetailsComponent.enableIsAddedToWatchlistToggler(this._changeData);

    render(this._bodyElement, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DETAILS;
  }

  _handleFormSubmit(emoji, commentText) {
    const newComment = {
      emotion: emoji,
      date: new Date(),
      comment: commentText,
    };
    this._changeData(
        this._film,
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        newComment
    );
  }

  _handleDeleteCommentClick(commentId) {
    const index = this._film.commentsIds.findIndex((comment) => comment === commentId);
    this._changeData(
        Object.assign({}, this._film, {
          comments: [...this._film.comments.slice(0, index),
            ...this._film.comments.slice(index + 1)],
          commentsIds: [...this._film.commentsIds.slice(0, index),
            ...this._film.commentsIds.slice(index + 1)]
        }),
        UserAction.REMOVE_COMMENT,
        UpdateType.PATCH,
        commentId
    );

  }

  _handleCommentsClick() {
    if (this._filmDetailsComponent && this._bodyElement.contains(this._filmDetailsComponent.getElement())) {
      return;
    }
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._film.comments = comments.slice();
      })
      .then(() => {
        this._renderFilmDetailsComponent();
      })
      .catch(() => {
        this._film.comments = [];
        this._renderFilmDetailsComponent();
        this._isAddAborted = !this._isAddAborted;
      });
  }

  _handleCloseButtonClick() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }
}
