import AbstractComponentView from "./abstract-component.js";

const TEST_NUMBER = 150000;

const createFooterStatisticsTemplate = (number) => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterStatistics extends AbstractComponentView {
  constructor(number = TEST_NUMBER) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._number);
  }
}
