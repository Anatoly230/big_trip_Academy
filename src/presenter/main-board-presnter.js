import { render, replace } from '../framework/render.js';
import PointView from '../view/point-view.js';
import FilterView from '../view/filter-view.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointsModel from '../model/point-model.js';
import PointPresenter from './point-presenter.js';


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
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    this.#renderPoints();

  }


  #renderPoints() {
    const pointPresenter = new PointPresenter(this.listComponent, this.citiesData);
    for (const point of this.pointsData) {
      pointPresenter.init(point);

    }
  }

}
