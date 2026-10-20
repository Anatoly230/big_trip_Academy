import { render } from '../framework/render.js';
import { getSorts } from '../utils/sorts.js';
import SortView from '../view/sort-view.js';


export default class SortPresenter {
  #sortModel = null;
  #sortView = null;

  constructor({ sortModel }) {
    this.#sortModel = sortModel;
    this.#sortModel.addObserver(this.#handleSortModelEvent.bind(this));
  }

  init(container) {
    this.#sortView = new SortView({
      onSortChange: this.#onSortChange.bind(this),
      sorts: getSorts(this.#sortModel.sortType),
    });
    render(this.#sortView, container);
  }

  #onSortChange(sortType) {
    this.#sortModel.sortType = { sortType };
  }

  #handleSortModelEvent() {
    // this.#sortView.updateElement({ sorts: getSorts(this.#sortModel.sortType) });
  }
  delete() {
    this.#sortView.element.remove();
  }
}
