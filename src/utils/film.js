import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';

const showYearFromDate = (date) => {
  return moment(date).format(`YYYY`);
};

const showFullReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

momentDurationFormatSetup(moment);
const showFilmDuration = (minutes) => {
  return moment.duration(minutes, `minutes`).format(`H[h] mm[m]`);
};

const showCommentDate = (date) => {
  return moment(date, `YYYY/MM/DD H:mm`).fromNow();
};
export {showYearFromDate, showFullReleaseDate, showFilmDuration, showCommentDate};
