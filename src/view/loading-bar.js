import {createElement} from "../utils";

const createLoadingBarTemplate = () => {
  return `<h2 class="films-list__title">Loading...</h2>`;
};

export default class LoadingBar {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createLoadingBarTemplate();
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
