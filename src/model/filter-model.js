import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.EVERETHING;
  get filter() {
    return this.#currentFilter;
  }

  set filter({ updateType, filter }) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
