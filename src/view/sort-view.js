import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getCleanSortValue } from '../utils/sorts.js';

function getSortItem({ sort, isDisabled, isActive }) {
  return `
            <div class="trip-sort__item  trip-sort__item--${sort}">
              <input id="sort-${sort}" class="trip-sort__input  visually-hidden"
              type="radio" name="trip-sort" value="sort-${sort}" ${isDisabled ? 'disabled' : ''} ${isActive ? 'checked' : ''}>
             <label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">${sort}</label>
            </div>
    `;
}

function createSortTemplate({ sorts }) {
  return `
          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sorts.map(getSortItem).join(' ')}
          </form>
          `;
}

export default class SortView extends AbstractStatefulView {
  #onSortChange = null;

  constructor({ onSortChange, sorts }) {
    super();
    this.#onSortChange = onSortChange;
    this._setState({ sorts });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('change', this.sortChangeHandler.bind(this));
  }

  get template() {
    return createSortTemplate(this._state);
  }

  sortChangeHandler(evt) {
    evt.preventDefault();
    this.#onSortChange(getCleanSortValue(evt.target.value));
  }
}
