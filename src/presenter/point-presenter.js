import { UpdateType, UserAction } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsContaner = null;
  #handleModeChange = null;
  #handleDataChange = null;
  #point = null;
  #pointsSrc = null;

  #pointView = null;
  #editPointView = null;

  #mode = Mode.DEFAULT;

  constructor({ point, pointsSrc, pointsContaner, onModeChange, onDataChange }) {
    this.point = point;
    this.#pointsSrc = pointsSrc;
    this.#pointsContaner = pointsContaner;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  createPoint(point) {
    this.#point = point;
    this.#pointView = new PointView({
      point: this.#point,
      destination: this.#pointsSrc.destinationsIdBook[this.#point.destination],
      offers: this.#point.offers.map((offer) => this.#pointsSrc.offersIdBook[offer]),
      onRollUpClick: this.#handleEditClick.bind(this),
      onFavoriteClick: this.#handleFavoriteClick.bind(this),
    });
    this.#editPointView = new EditPointView({
      point: this.#point,
      pointsSrc: this.#pointsSrc,
      onCloseEdit: this.#handleCloseEditClick.bind(this),
      onSave: this.#saveEditPoint.bind(this),
      onDestination: this.#onDestination.bind(this),
      onEventType: this.#onEventType.bind(this),
    }
    );
  }

  #updatePointsViews() {
    this.#editPointView.updateElement({
      offers: this.point.offers,
      basePrice: this.point.point.basePrice,
      dateFrom: this.point.point.dateFrom,
      dateTo: this.point.point.dateTo,
      pointType: this.point.point.type,
      possibleOffers: this.point.possibleOffers,
      destination: this.point.destination,
    });
  }

  removePoint() {
    remove(this.#pointView);
    remove(this.#editPointView);
  }

  init(point) {
    if (point) {
      this.#point = point;
    }

    const prevPointView = this.#pointView;
    const prevEditPointView = this.#editPointView;

    this.createPoint(this.#point);

    if (prevPointView === null || prevEditPointView === null) {
      render(this.#pointView, this.#pointsContaner.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointView, prevPointView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointView, prevEditPointView);
    }

    remove(prevPointView);
    remove(prevEditPointView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointView.reset(this.#point); // перевод в изначальное положение данных во view возможно только 
      // тогда когда она находится в дереве html, если её от туда забрать, то parent элемент будет являться null, 
      // поэтому эта оперция должна стоять раньше метода this.#replaceFormToCard(), так как он выдирает view из дерева html 
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    this.#handleModeChange(this.#point.id);
    replace(this.#editPointView, this.#pointView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointView, this.#editPointView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.resetView();
    }
  };

  #handleEditClick() {
    this.#replaceCardToForm();
  }

  #handleCloseEditClick() {
    this.resetView();
  }

  #saveEditPoint() {
    console.log('its save');
  }

  #handleFavoriteClick() {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #onDestination(cityName) {
    const newDestination = this.pointsModel.destinationsByName[cityName];
    // this.#editPointView.updateElement({
    //   destination: newDestination,
    //   offers: [],
    // });
  }

  #onEventType(newType) {
    const newOffersByType = this.pointsModel.offersByType(newType);
    this.#editPointView.updateElement({
      pointType: newType,
      offers: [],
      possibleOffers: newOffersByType,
    });
  }

  #onDateChange(dateChanges) {
    this.#editPointView.updateElement(dateChanges);
  }

}
