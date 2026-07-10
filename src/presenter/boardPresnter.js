import { render } from '../render.js';
import PointView from '../view/point.js';
import FilterView from '../view/filter.js';
import ListView from '../view/list.js';
import PointFormView from '../view/pointForm.js';
import SortView from '../view/sort.js';


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
