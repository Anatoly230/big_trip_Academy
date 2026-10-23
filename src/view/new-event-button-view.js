import AbstractView from '../framework/view/abstract-view.js';

function createNewPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #onNewEvent = null;

  constructor({ onNewEvent }) {
    super();
    this.#onNewEvent = onNewEvent;
    this.element.addEventListener('click', this.#onNewEventHandler);
  }

  #disable() {
    this.element.disabled = true;
  }

  #enable() {
    this.element.disabled = false;
  }

  #onNewEventHandler = () => {
    this.#disable();
    this.#onNewEvent();
  };

  get template() {
    return createNewPointButtonTemplate();
  }
}
