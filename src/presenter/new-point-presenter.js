import { UpdateType, UserAction } from '../const.js';
import { render, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';


export default class newPointPresenter {
  #pointsContainer = null;
  #handleDataChange = null;
  #pointsSrc = null;
  #editPointView = null;

  constructor({ pointsSrc, pointsContainer, onDataChange }) {
    this.#pointsSrc = pointsSrc;
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
  }

  #createPoint() {
    this.#editPointView = new EditPointView({
      pointsSrc: this.#pointsSrc,
      onCloseEdit: this.#onDeleteClick.bind(this),
      onSubmit: this.#saveEditPoint.bind(this),
      onDelete: this.#onDeleteClick.bind(this),
    })
  }

  init() {
    this.#createPoint();
    render(this.#editPointView, this.#pointsContainer.element, 'afterBegin');
  }

  #saveEditPoint(update) {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update);
    this.#closeEditForm()
  }
  #closeEditForm() {
    remove(this.#editPointView);
  }
  #onDeleteClick() {
    this.#closeEditForm()
  }

};
