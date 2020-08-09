const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.round(lower + Math.random() * (upper - lower));
};

const showYearFromDate = (date) => {
  return date.toLocaleString(`en-GB`, {year: `numeric`});
};

const showFullReleaseDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

const showShortDescription = (description) => {
  return description.slice(0, 140);
};
export {getRandomInteger, showYearFromDate, showFullReleaseDate, showShortDescription};
