import { render } from '../render.js';
import PointView from '../view/point-view.js';
import FilterView from '../view/filter-view.js';
import ListView from '../view/list-view.js';
import PointFormView from '../view/point-form-view.js';
import SortView from '../view/sort-view.js';


export default class BoardPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();
  filterComponent = new FilterView();

  constructor({ container, filterContainer }) {
    this.container = container;
    this.filterContainer = filterContainer;
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new PointFormView, this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
