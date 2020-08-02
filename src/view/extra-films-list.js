export const createExtraFilmsListTemplate = (extraHeader) => {
  return (
    `<section class="films-list--extra">\n      <h2 class="films-list__title">` +
    extraHeader +
    `</h2>\n` +
    `      <div class="films-list__container">\n` +
    `      </div>\n` +
    `    </section>`
  );
};
