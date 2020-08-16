import {createElement} from "../utils";
const TEST_NUMBER = 150000;

const createFooterStatisticsTemplate = (number) => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterStatistics {
  constructor(number = TEST_NUMBER) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._number);
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
