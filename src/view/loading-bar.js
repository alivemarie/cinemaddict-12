import AbstractComponentView from "./abstract-component.js";

const createLoadingBarTemplate = () => {
  return `<h2 class="films-list__title">Loading...</h2>`;
};

export default class LoadingBar extends AbstractComponentView {

  getTemplate() {
    return createLoadingBarTemplate();
  }
}
