import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERETHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createEmptyList({filterType}) {
  const noPointsText = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointsText}</p>`;
}

export default class EmptyListView extends AbstractStatefulView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyList(this.#filterType);
  }
}
