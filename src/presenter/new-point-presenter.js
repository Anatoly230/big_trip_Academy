import { UpdateType, UserAction } from '../const.js';
import { render, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';


export default class newPointPresenter {
  #pointsContainer = null;
  #handleDataChange = null;
  #pointsSrc = null;
  #editPointView = null;
  #onCloseNewPointForm = null;

  constructor({ pointsSrc, pointsContainer, onDataChange, onCloseNewPointForm }) {
    this.#pointsSrc = pointsSrc;
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#onCloseNewPointForm = onCloseNewPointForm;
  }

  #createPoint() {
    this.#editPointView = new EditPointView({
      pointsSrc: this.#pointsSrc,
      onCloseEdit: this.closeEditForm.bind(this),
      onSubmit: this.#saveEditPoint.bind(this),
      onDelete: this.closeEditForm.bind(this),
    });
  }

  init() {
    this.#createPoint();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    render(this.#editPointView, this.#pointsContainer.element, 'afterBegin');
  }

  #saveEditPoint(update) {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update);
    this.closeEditForm();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.closeEditForm();
    }
  };

  closeEditForm() {
    remove(this.#editPointView);
    this.#onCloseNewPointForm();
    this.#editPointView = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

};
