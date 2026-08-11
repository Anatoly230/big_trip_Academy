import PointPresenter from './point-presenter.js';
import { render, replace } from '../framework/render.js';

class PointSwitcher {
  #open = null;
  #close = null;

  #setOpenPoint(open, close) {
    this.#open = open;
    this.#close = close;
  }

  #resetOpenPoint() {
    this.#open = null;
    this.#close = null;
  }

  #isSamePoint({ point }) {
    return this.#open.point.id === point.id;
  }

  #fixOpenPoint(open, close) {
    if (!this.#open && !this.#close) {
      this.#setOpenPoint(open, close);
      return true;
    }
    return false;
  }

  getState() {
    const open = this.#open;
    const close = this.#close;
    return { open, close };
  }

  swap(open, close) {
    if (!open && !close) {
      replace(this.#close, this.#open);
      this.#resetOpenPoint();
      return;
    }
    if (this.#fixOpenPoint(open, close)) {
      replace(open, close);
      return;
    }
    if (this.#isSamePoint(open)) {
      replace(close, open);
      this.#resetOpenPoint();
      return;
    }
    replace(this.#close, this.#open);
    replace(open, close);
    this.#setOpenPoint(open, close);
  }
}

export default class PointsListPresenter {
  #listComponent = null;
  #pointsData = null;
  #pointGenerator = null;
  #citiesData = null;
  #pointSwitcher = new PointSwitcher();
  #allPointsViews = new Map();


  constructor(listComponent, pointsData, citiesData) {
    this.#listComponent = listComponent;
    this.#pointsData = pointsData;
    this.#citiesData = citiesData;
  }

  init() {
    for (const pointData of this.#pointsData) {
      const { pointView, editPointView } = new PointPresenter(pointData, this.#citiesData, this.#pointSwitcher);
      this.#allPointsViews.set(pointView, editPointView);
      render(pointView, this.#listComponent.element);
    }
  }

  getAllPoints() {
    return this.#allPointsViews;
  }

}

