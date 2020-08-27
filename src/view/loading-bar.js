import AbstractView from "./abstractComponent";

const createLoadingBarTemplate = () => {
  return `<h2 class="films-list__title">Loading...</h2>`;
};

export default class LoadingBar extends AbstractView {

  getTemplate() {
    return createLoadingBarTemplate();
  }
}
