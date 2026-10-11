import Observable from '../framework/observable.js';
import { allPoints } from '../mock/point-mock.js';
import { allOffers } from '../mock/offer-mock.js';
import { cities } from '../mock/destination-info.js';
import { destinations } from '../mock/destination-mock.js';

export default class PointsModel extends Observable {
  #allPoints = null;
  #possibleOffers = null;
  #allOfferTypes = null;
  #allCities = null;
  #destinations = null;
  #destinationsIdBook = null;
  #destinationsNameBook = null;
  #fullDataList = null;
  #pointsIdBook = null;
  #offersIdBook = null;
  #offersTypeBook = null;


  updatePoint(updateType, update) {
    this._notyfy(updateType, update);
  }

  addPoint(updateType, update) {
    this._notyfy(updateType, update);

  }

  deletePoint(updateType, update) {

    this._notyfy(updateType, update);
  }


  get points() {
    if (!this.#allPoints) {
      this.#allPoints = allPoints;
    }
    return this.#allPoints;
  }

  get cities() {
    if (!this.#allCities) {
      this.#allCities = cities;
    }
    return this.#allCities;
  }

  get possibleOffers() {
    if (!this.#possibleOffers) {
      this.#possibleOffers = allOffers;
    }
    return this.#possibleOffers;
  }

  get offersTypeBook() {
    if (!this.#offersTypeBook) {
      this.#offersTypeBook = this.possibleOffers.reduce((book, item) => {
        book[item.type] = item.offers;
        return book;
      }, {});
    }
    return this.#offersTypeBook;
  }

  get offersIdBook() {
    if (!this.#offersIdBook) {
      const heap = [];
      for (const offer of this.#possibleOffers) {
        heap.push(...offer.offers);
      }
      this.#offersIdBook = heap.reduce(this.#setByProp('id'), {});
    }
    return this.#offersIdBook;
  }


  get allOfferTypes() {
    if (!this.#allOfferTypes) {
      this.#allOfferTypes = allOffers.map(function getType(el) { return el.type });
    }
    return this.#allOfferTypes;
  }

  get destinations() {
    if (!this.#destinations) {
      this.#destinations = destinations;
    }
    return this.#destinations;
  }

  get destinationsIdBook() {
    if (!this.#destinationsIdBook) {
      this.#destinationsIdBook = destinations.reduce(this.#setByProp('id'), {});
    }
    return this.#destinationsIdBook;
  }

  get destinationsNameBook() {
    if (!this.#destinationsNameBook) {
      this.#destinationsNameBook = destinations.reduce(this.#setByProp('name'), {});
    }
    return this.#destinationsNameBook;
  }

  get pointsIdBook() {
    if (!this.#pointsIdBook) {
      this.#pointsIdBook = this.points.reduce(this.#setByProp('id'), {});
    }
    return this.#pointsIdBook;
  }

  updateFavorite(pointId, favoriteState) {
    const updatedPoint = this.#pointsIdBook[pointId];
    updatedPoint.point.isFavorite = favoriteState;
  }

  offersByType(pointType) {
    function getOffersByType(el) {
      return el.type === pointType;
    }
    return this.possibleOffers.filter(getOffersByType)[0].offers;
  }

  get srcInfo() {
    return {
      offersTypeBook: this.offersTypeBook,
      offersIdBook: this.offersIdBook,
      offersTypes: this.allOfferTypes,
      cities: this.cities,
      destinationsNameBook: this.destinationsNameBook,
      destinationsIdBook: this.destinationsIdBook,
    };
  }

  #setByProp(prop) {
    return function handlerByProp(set, item) {
      set[item[prop]] = item;
      return set;
    };
  }

}
