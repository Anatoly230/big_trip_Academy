import { allPoints, allOffers } from '../mock/point-mock.js';
import { offers } from '../mock/offer-info.js';
import { cities } from '../mock/destination-info.js';
import { destinations } from '../mock/destination-mock.js';

export default class PointsModel {
  #allPoints;
  #possibleOffers;
  #allOffersTypes;
  #allCities;
  #destinations;
  #fullDataList;
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

  get allOffersTypes() {
    if (!this.#allOffersTypes) {
      this.#allOffersTypes = Object.keys(offers);
    }
    return this.#allOffersTypes;
  }

  get destinations() {
    if (!this.#destinations) {
      this.#destinations = destinations;
    }
    return this.#destinations;
  }

  get fullDataList() {
    if (!this.#fullDataList) {
      this.#datalistInit();
    }
    return this.#fullDataList;
  }


  #datalistInit() {
    let offersByType;
    let id;
    let pointItem;

    function getElementById(el) {
      return el.id === id;
    }

    function getOffersCombine(elId) {
      let element;
      id = elId;
      for (const offer of offersByType) {
        element = offer.offers.find(getElementById);
        if (element) {
          return element;
        }
      }
    }

    function getDestinationById(el) {
      return el.id === pointItem.destination;
    }

    function getOffersByType(el) {
      return el.type === pointItem.type;
    }

    this.#fullDataList = [];
    /* определение принадлежности предложений, пунктов назначений к точкам */
    for (const p of this.points) {
      pointItem = p;
      offersByType = this.possibleOffers.filter(getOffersByType); /* определение типа предложений точки*/
      const destination = this.destinations.find(getDestinationById); /* определение принадлежности пункта назхначения к точке*/
      const pointOffers = p.offers.map(getOffersCombine); /* добавление всех предложений относящихся к данной точке*/
      this.#fullDataList.push(Object
        .create(
          {
            point: p,
            offers: pointOffers,
            destination: destination,
            possibleOffers: p.allOffers.offers,
            offersTypes: this.allOffersTypes,
          }
        )); /* добавить  укомплектованную точку  в масиив*/
    }
    /* определение принадлежности предложений, пунктов назначений к точкам */
  }
}
