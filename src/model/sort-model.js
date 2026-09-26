import Observable from '../framework/observable.js';
import { SortType } from '../const.js';

export default class SortModel extends Observable {
  #currendSortType = SortType.DEFAULT;

  get sortType() {
    return this.#currendSortType;
  }

  set sortType({ updateType, sortType }) {
    this.#currendSortType = sortType;
    this._notify(updateType, sortType);
  }
}
