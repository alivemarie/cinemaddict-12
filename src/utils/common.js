const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.round(lower + Math.random() * (upper - lower));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const runOnKeys = (func, ...codes) => {
  const pressed = new Set();
  const fewButtonPressHandler = (event) => {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();

    document.removeEventListener(`keydown`, fewButtonPressHandler);
  };

  document.addEventListener(`keydown`, fewButtonPressHandler);

  const keyUpHandler = (event) => {
    pressed.delete(event.code);

    document.removeEventListener(`keyup`, keyUpHandler);
  };

  document.addEventListener(`keyup`, keyUpHandler);
};

export {getRandomInteger, updateItem, runOnKeys};
