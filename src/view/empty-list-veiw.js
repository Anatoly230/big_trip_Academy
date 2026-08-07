import AbstractView from '../framework/view/abstract-view';

function createEmptyList(message) {
  return `<p class="trip-events__msg">${message ? message : ''}</p>`;
}

export default class EmptyListView extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return createEmptyList(this.message);
  }
}
