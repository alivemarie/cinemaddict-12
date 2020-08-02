export const createSortingTemplate = () => {
  return (
    `<ul class="sort">\n` +
    `    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>\n` +
    `    <li><a href="#" class="sort__button">Sort by date</a></li>\n` +
    `    <li><a href="#" class="sort__button">Sort by rating</a></li>\n` +
    `  </ul>`
  );
};
