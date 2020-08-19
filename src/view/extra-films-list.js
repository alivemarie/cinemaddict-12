const TEST_EXTRA_HEADER = `Recommend you`;
import AbstractView from "./abstract.js";

const createExtraFilmsListTemplate = (extraHeader) => {
  return `<section class="films-list--extra">
            <h2 class="films-list__title">${extraHeader}</h2>
            <div class="films-list__container"></div></section>`;
};

export default class ExtraFilmsList extends AbstractView {
  constructor(extraHeader = TEST_EXTRA_HEADER) {
    super();
    this._extraHeader = extraHeader;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._extraHeader);
  }
}
