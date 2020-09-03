import AbstractComponent from "./abstract-component.js";

class SmartComponent extends AbstractComponent {
  constructor() {
    super();
    this._filmDetails = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._filmDetails = Object.assign(
        {},
        this._filmDetails,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

}

export default SmartComponent;
