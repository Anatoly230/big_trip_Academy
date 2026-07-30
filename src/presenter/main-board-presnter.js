import { render, replace } from '../framework/render.js';
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
  }

  init() {
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    this.#renderPoints();

  }

  #renderPoints() {
    for (let i = 0; i < this.pointsData.length - 1; i++) {
      const editPointView = new EditPointView(this.pointsData[i], this.citiesData);
      const pointView = new PointView(this.pointsData[i]);
      pointView.setOnRollupClickHandler(this.#changePointView.bind(this, editPointView, pointView));
      editPointView.setOnRollupClickHandler(this.#changePointView.bind(this, pointView, editPointView));
      editPointView.setOnEscapetHandler(this.#changePointView.bind(this, pointView, editPointView));
      editPointView.setOnSubmitHandler(this.#saveCangesOnSaveButton);
      render(pointView, this.listComponent.element);
    }
  }

  #saveCangesOnSaveButton() {
    console.log('its save')
  }

  #changePointView(newPoint, oldPoint) {
    replace(newPoint, oldPoint);
  }
}
