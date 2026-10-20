import Observable from '../framework/observable.js';
import { allPoints } from '../mock/point-mock.js';
import { allOffers } from '../mock/offer-mock.js';
import { cities } from '../mock/destination-info.js';
import { destinations } from '../mock/destination-mock.js';

export default class PointsModel extends Observable {
  #allPoints = null;
  #offers = null;
  #offerTypes = null;
  #allCities = null;
  #destinations = null;
  #destinationsIdBook = null;
  #destinationsNameBook = null;
  #pointsIdBook = null;
  #offersIdBook = null;
  #offersTypeBook = null;


  updatePoint(updateType, update) {
    this.pointsIdBook[update.id] = update;
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._notify(updateType, update);

  }

  deletePoint(updateType, update) {
    this.#allPoints = this.#allPoints.filter((point) => point.id !== update.id);
    this.#pointsIdBook = null;
    this._notify(updateType, update);
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

  get offers() {
    if (!this.#offers) {
      this.#offers = allOffers;
    }
    return this.#offers;
  }

  get offersTypeBook() {
    if (!this.#offersTypeBook) {
      this.#offersTypeBook = this.offers.reduce((book, item) => {
        book[item.type] = item.offers;
        return book;
      }, {});
    }
    return this.#offersTypeBook;
  }

  get offersIdBook() {
    if (!this.#offersIdBook) {
      const heap = [];
      for (const offer of this.#offers) {
        heap.push(...offer.offers);
      }
      this.#offersIdBook = heap.reduce(this.#setByProp('id'), {});
    }
    return this.#offersIdBook;
  }


  get offerTypes() {
    if (!this.#offerTypes) {
      this.#offerTypes = allOffers.map(function getType(el) { return el.type });
    }
    return this.#offerTypes;
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
    return this.offers.filter(getOffersByType)[0].offers;
  }

  get srcInfo() {
    return {
      offersTypeBook: this.offersTypeBook,
      offersIdBook: this.offersIdBook,
      offerTypes: this.offerTypes,
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
