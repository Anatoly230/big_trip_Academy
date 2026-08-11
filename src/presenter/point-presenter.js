import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointsContaner = null;
  constructor({ point, cities, pointsContaner, onOpen, onClose }) {
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.#pointsContaner = pointsContaner;
    this.pointId = point.point.id;
    this.pointView = new PointView(point, this.#openPoint.bind(this));
    this.editPointView = new EditPointView(point, cities, this.closePoint.bind(this), this.#saveEditPoint.bind(this));
  }

  init() {
    render(this.pointView, this.#pointsContaner.element);
  }

  #openPoint(){
    this.onOpen(this.pointId);
    replace(this.editPointView, this.pointView);
  }

  closePoint(){
    this.onClose();
    replace(this.pointView, this.editPointView);
  }

  #saveEditPoint(){
    console.log('its save');
  }

}
