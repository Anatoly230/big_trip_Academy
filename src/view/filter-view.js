import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createFilterTemplateItem({ filter, isActive }) {
  return `
  <div class='trip-filters__filter'>
      <input id='filter-${filter}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${filter}' ${isActive ? 'checked' : ''}>
      <label class='trip-filters__filter-label' for='filter-${filter}'>${filter}</label>
  </div>
  `;
}

function createFilterTemplate({ filters }) {
  return `
          <form class="trip-filters" action="#" method="get">
              ${filters.map(createFilterTemplateItem).join('')}
              <button class='visually-hidden' type='submit'>Accept filter</button>
          </form>`;
}

export default class FilterView extends AbstractStatefulView {
  #onFilterChange = null;
  constructor({ onFilterChange, filters }) {
    super();
    this.#onFilterChange = onFilterChange;
    this._setState({ filters });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('change', this.#filterChangeHandler.bind(this));
  }

  get template() {
    return createFilterTemplate(this._state);
  }

  #filterChangeHandler(evt) {
    evt.preventDefault();
    this.#onFilterChange(evt.target.value);
  }
}
