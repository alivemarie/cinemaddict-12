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

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomItem = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

export {getRandomInteger, updateItem, getRandomItem, generateId};
