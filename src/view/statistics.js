import AbstractComponentView from "./abstract-component.js";
import {matchRatingWithRank} from "./profile.js";
import {FilterType} from "../consts.js";
import {filter} from "../utils/filter.js";
import moment from "moment";
import {getUserRating} from "../mock/user.js";
import {renderChart} from "../utils/chart.js";

const TimeFilter = {
  ALLTIME: {
    name: `All time`,
    label: `all-time`,
  },
  TODAY: {
    name: `Today`,
    label: `day`,
  },
  WEEK: {
    name: `Week`,
    label: `week`,
  },
  MONTH: {
    name: `Month`,
    label: `month`,
  },
  YEAR: {
    name: `Year`,
    label: `year`,
  },
};

const getWatchedFilmsByPeriod = (films, period) => {
  const watchedFilms = filter[FilterType.WATCHED](films);

  if (period === TimeFilter.ALLTIME.label) {
    return watchedFilms;
  }

  const startOfPeriod = moment().startOf(period);
  return watchedFilms.filter((film) => moment(film.watchingDate).isAfter(startOfPeriod));
};

const getGenres = (films) => {
  const allGenres = films.map((film) => film.genres);
  return allGenres.flat();
};

const getTotalGenresNumber = (films) => {
  return Array.from(new Set(getGenres(films)));
};

const getFilmsNumberByGenres = (films) => {
  const totalGenresNumber = getTotalGenresNumber(films);

  const genresCount = totalGenresNumber.map((genre) => {
    return {
      genre,
      count: films.filter((film) => film.genres.includes(genre)).length
    };
  });

  return genresCount.sort((a, b) => b.count - a.count);
};

const getTopGenre = (films) => getFilmsNumberByGenres(films)[0].genre;

const createStatisticFilterTemplate = (statisticFilter, isChecked) => {
  const {name, label} = statisticFilter;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${label}" value="${label}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${label}" class="statistic__filters-label for="statistic-${label}">${name}</label>`
  );
};

const createStatisticsTemplate = (films, currentFilter) => {
  const duration = films.reduce((filmsDuration, film) => {
    filmsDuration += film.duration;
    return filmsDuration;
  }, 0);

  const topGenre = films.length > 0 ? getTopGenre(films) : ``;
  const rating = getUserRating(films);
  const rank = matchRatingWithRank(rating);

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  let timeFiltersTemplate = ``;
  for (const timefilter in TimeFilter) {
    if (timefilter) {
      timeFiltersTemplate = timeFiltersTemplate
        .concat(createStatisticFilterTemplate(TimeFilter[timefilter],
            currentFilter === TimeFilter[timefilter].label));
    }
  }

  return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${timeFiltersTemplate}
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`;
};

export default class StatisticsView extends AbstractComponentView {
  constructor(films) {
    super();

    this._films = films;
    this._currentTimeFilter = TimeFilter.ALLTIME.label;

    this._allWatchedFilms = getWatchedFilmsByPeriod(this._films, TimeFilter.ALLTIME.label);

    this._changePeriodClickHandler = this._changePeriodClickHandler.bind(this);
    this._showChart = this._showChart.bind(this);

    this._ctx = this.getElement().querySelector(`.statistic__chart`);


    this._showChart(this._allWatchedFilms, this._ctx);
  }

  _showChart(films, ctx) {
    this._totalGenresNumber = getTotalGenresNumber(films).length;
    this._labels = getFilmsNumberByGenres(films).map((genre) => genre.genre);
    this._data = getFilmsNumberByGenres(films).map((genre) => genre.count);
    renderChart(films, ctx, this._totalGenresNumber, this._labels, this._data);
  }

  _changePeriodClickHandler(evt) {
    evt.preventDefault();
    this._currentTimeFilter = evt.target.value;
    this._filmsByPeriod = getWatchedFilmsByPeriod(this._films, this._currentTimeFilter);
    this.updateElement();
  }

  setPeriodClickHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._changePeriodClickHandler);
  }

  getTemplate() {
    return createStatisticsTemplate(getWatchedFilmsByPeriod(this._films, this._currentTimeFilter), this._currentTimeFilter);
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
    this._showChart(this._filmsByPeriod, this._ctx);
  }

  restoreHandlers() {
    this.setPeriodClickHandler();
    this._ctx = this.getElement().querySelector(`.statistic__chart`);
  }
}
