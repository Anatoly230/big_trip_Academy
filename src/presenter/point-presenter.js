import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';


class PoinOpenCloseController {
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
    this.#resetOpenPoint();
    return { open, close };
  }

  swap(open, close) {
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


export default class PointPresenter {
  #citiesData = null;
  #pointsList = null;
  #pointData = null;
  #openPoint = null;
  #allPointsViews = new Set();
  #pointSwitcher = new PoinOpenCloseController();

  constructor(pointsList, citiesData,) {
    this.#pointsList = pointsList;
    this.#citiesData = citiesData;
    document.addEventListener('keydown', this.#onEscapedown.bind(this));
  }

  init(point) {
    const pointView = new PointView(point, openClosePoint.bind(this));
    const editPointView = new EditPointView(point, this.#citiesData, openClosePoint.bind(this), saveEditPoint.bind(this));
    this.#allPointsViews.add([pointView, editPointView]);

    function saveEditPoint(evt) {
      evt.preventDefault();
      console.log('its save');
    }

    function openClosePoint(evt) {
      evt.preventDefault();
      this.#pointSwitcher.swap(editPointView, pointView);
    }

    render(pointView, this.#pointsList.element);
  }

  getAllPoints() {
    return this.#allPointsViews;
  }

  #closeLastOpenPoint() {
    const { open, close } = this.#pointSwitcher.getState();
    if (open) {
      replace(close, open);
    }
  }

  #onEscapedown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closeLastOpenPoint();
    }
  }

}
