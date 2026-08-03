import { allPoints, allOffers } from '../mock/point-mock.js';
import { cities } from '../mock/destination-info.js';
import { destinations } from '../mock/destination-mock.js';

export default class PointsModel {
  #allPoints;
  #allOffers;
  #allCities;
  #destinations;
  #fullDataList;
  getPoints() {
    if (!this.#allPoints) {
      this.#allPoints = allPoints;
    }
    return this.#allPoints;
  }

  getCities() {
    if (!this.#allCities) {
      this.#allCities = cities;
    }
    return this.#allCities;
  }

  getOffers() {
    if (!this.#allOffers) {
      this.#allOffers = allOffers;
    }
    return this.#allOffers;
  }

  getDestinations() {
    if (!this.#destinations) {
      this.#destinations = destinations;
    }
    return this.#destinations;
  }

  getFullDataList() {
    if (!this.#fullDataList) {
      this.#datalistInit();
    }
    return this.#fullDataList;
  }


  #datalistInit() {
    let offers;
    let id;
    let pointItem;

    function getElementById(el) {
      return el.id === id;
    }

    function getOffersCombine(elId) {
      let element;
      id = elId;
      for (const offer of offers) {
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
    for (const p of this.getPoints()) {
      pointItem = p;
      offers = this.getOffers().filter(getOffersByType); /* определение типа предложений точки*/

      const destination = this.getDestinations().find(getDestinationById); /* определение принадлежности пункта назхначения к точке*/
      const pointOffers = p.offers.map(getOffersCombine); /* добавление всех предложений относящихся к данной точке*/
      this.#fullDataList.push(Object.create({ point: p, offers: pointOffers, destination: destination, possibleOffers: p.allOffers.offers })); /* добавить  укомплектованную точку  в масиив*/
    }
    /* определение принадлежности предложений, пунктов назначений к точкам */
  }
}
