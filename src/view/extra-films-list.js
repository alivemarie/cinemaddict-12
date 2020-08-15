const TEST_EXTRA_HEADER = `Recommend you`;
import {createElement} from "../utils";

const createExtraFilmsListTemplate = (extraHeader) => {
  return `<section class="films-list--extra">
            <h2 class="films-list__title">${extraHeader}</h2>
            <div class="films-list__container"></div></section>`;
};

export default class ExtraFilmsList {
  constructor(extraHeader = TEST_EXTRA_HEADER) {
    this._extraHeader = extraHeader;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._extraHeader);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
