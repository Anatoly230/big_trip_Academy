import { render, replace } from '../framework/render.js';
import { getFilters } from '../utils/filters.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterModel = null;
  #filterView = null;
  #filterContainer = null;

  constructor({
    filterContainer,
    filterModel,
    pointsModel
  }) {

    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleFilterModelEvent.bind(this));
  }


  init() {
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      onFilterChange: this.#onFilterChange.bind(this),
      filters: getFilters(this.#filterModel.filter),
    });

    if (prevFilterView === null) {
      render(this.#filterView, this.#filterContainer);
      return;
    }
    replace(this.#filterView, prevFilterView);
  }

  #onFilterChange(filterType) {
    this.#filterModel.filter = { filter: filterType };
  }

  #handleFilterModelEvent() {
    this.#filterView.updateElement({ filters: getFilters(this.#filterModel.filter) });
  }
}
