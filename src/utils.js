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

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {getRandomInteger, showYearFromDate, showFullReleaseDate, renderTemplate, RenderPosition, render, createElement};
