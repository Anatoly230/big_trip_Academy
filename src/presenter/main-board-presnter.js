import { render } from '../render.js';
import PointView from '../view/point-view.js';
import FilterView from '../view/filter-view.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointsModel from '../model/point-model.js';


export default class BoardPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();
  filterComponent = new FilterView();
  pointsModelComponent = new PointsModel();

  constructor({ container, filterContainer }) {
    this.container = container;
    this.filterContainer = filterContainer;
    this.pointsData = this.pointsModelComponent.getFullDataList();
    this.citiesData = this.pointsModelComponent.getCities();
    this.startPoint = this.pointsModelComponent.getStartPoint();/*временный элемент*/
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new EditPointView(this.startPoint, this.citiesData), this.listComponent.getElement());

    for (let i = 1; i < this.pointsData.length - 1; i++) {
      render(new PointView(this.pointsData[i]), this.listComponent.getElement());
    }
  }
}
