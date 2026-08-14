import PointPresenter from './point-presenter.js';

export default class PointsListPresenter {
  #listComponent = null;
  #pointsData = null;
  #pointGenerator = null;
  #citiesData = null;
  #allPointPresenters = new Map();
  #openedPoint = null;
  #pointsModel = null;


  constructor(listComponent, pointsData, citiesData, pointsModel) {
    this.#listComponent = listComponent;
    this.#pointsData = pointsData;
    this.#citiesData = citiesData;
    this.#pointsModel = pointsModel;
  }

  init() {
    for (const pointData of this.#pointsData) {
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

  #onEscDownHandler = () => {
    if (this.#openedPoint) {
      this.#allPointPresenters.get(this.#openedPoint).closePoint();
    }
  };

  #getAllPoints() {
    return this.#allPointPresenters;
  }

}

