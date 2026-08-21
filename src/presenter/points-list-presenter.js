import { SortType } from '../utils/const.js';
import PointPresenter from './point-presenter.js';


export default class PointsListPresenter {
  #listComponent = null;
  #pointsData = null;
  #pointGenerator = null;
  #citiesData = null;
  #allPointPresenters = new Map();
  #openedPoint = null;
  #pointsModel = null;
  #currentSortType = null;
  #sortModel = null;


  constructor(listComponent, pointsData, citiesData, pointsModel) {
    this.#listComponent = listComponent;
    this.#pointsData = pointsData;
    this.#citiesData = citiesData;
    this.#pointsModel = pointsModel;
    this.#currentSortType = SortType.DEFAULT;
  }

  init(points = this.#pointsData) {

    for (const pointData of points) {
      const pointPresenter = new PointPresenter({
        point: pointData,
        cities: this.#citiesData,
        pointsContaner: this.#listComponent,
        onOpen: this.#onOpenPoint.bind(this),
        onClose: this.#onClosePoint.bind(this),
        pointsModel: this.#pointsModel,
      });
      pointPresenter.init();
      this.#allPointPresenters.set(pointData.point.id, pointPresenter);
    }
  }

  #removePointViews(el) {
    el.removePoint();
  }

  onSortClick(sortType){
    if (sortType === this.#currentSortType) {
      return;
    }
    const points = this.#pointsModel.getSortedPoints(sortType);
    this.#removePoints();
    this.#currentSortType = sortType;
    this.init(points);
  }

  #removePoints() {
    this.#allPointPresenters.forEach(this.#removePointViews);
    this.#allPointPresenters = new Map();
  }

  #onOpenPoint(id) {
    if (!this.#openedPoint) {
      this.#openedPoint = id;
    } else {
      this.#allPointPresenters.get(this.#openedPoint).closePoint();
      this.#openedPoint = id;
    }
    document.addEventListener('keydown', this.#onEscDownHandler);
  }

  #onClosePoint() {
    document.removeEventListener('keydown', this.#onEscDownHandler);
    this.#openedPoint = null;
  }

  #onEscDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      if (this.#openedPoint) {
        this.#allPointPresenters.get(this.#openedPoint).closePoint();
      }
    }
  };

  #getAllPoints() {
    return this.#allPointPresenters;
  }

}

