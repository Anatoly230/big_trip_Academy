import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplateItem(filter) {

  return `
        <div class='trip-filters__filter'>
          <input id='filter-${filter.toLowerCase()}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${filter.toLowerCase()}' ${filter.toLowerCase() !== 'Everthing'.toLowerCase() ? 'disabled' : ''}>
            <label class='trip-filters__filter-label' for='filter-${filter.toLowerCase()}'>${filter}</label>
        </div>
        `
}

function createFilterTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
              ${filters.map(createFilterTemplateItem).join('')}
              <button class='visually-hidden' type='submit'>Accept filter</button>
         </form>`;
}

export default class FilterView extends AbstractView {

  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterTemplate(this.filters);
  }
}
