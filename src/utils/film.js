const showYearFromDate = (date) => {
  return date.toLocaleString(`en-GB`, {year: `numeric`});
};

const showFullReleaseDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

export {showYearFromDate, showFullReleaseDate};
