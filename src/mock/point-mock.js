import { getRandomFromArray, getId, getRandomPrice, getRandomNum } from '../utils/utils.js';
import { allOffers } from './offer-mock.js';
import { destinations } from './destination-mock.js';


const PRFIX = 'PNT';
const POINTS_COUNT = 5;

function getOfersId(el) {
  return el.id;
}

const timeEnlarger = (function getTimeEnlarger() {
  const date = new Date();
  let startDate = true;
  return function getAddMinuts(min = 15, max = 180) {
    if (startDate) {
      date.setMinutes(date.getMinutes() + getRandomNum(min, max));
      date.setHours(date.getHours() + getRandomNum(2, 7));
      date.setDate(date.getDate() + getRandomNum(2, 5));
      startDate = false;
    } else {
      date.setMinutes(date.getMinutes() + getRandomNum(min, max));
      startDate = true;
    }
    return date;
  };
}());

class PointMock {
  constructor(offersList) {
    this.id = getId(PRFIX);
    this.basePrice = getRandomPrice();
    this.dateFrom = timeEnlarger(10, 30).toJSON();
    this.dateTo = timeEnlarger().toJSON();
    this.destination = getRandomFromArray(destinations)['id'];/* айди города из статичных данных */
    this.isFavorite = getRandomNum() % 2 === 1; /* выбрано как 'лучшее' */
    this.offers = offersList.offers.map(getOfersId);
    this.type = offersList.type;
  }
}

export const allPoints = (function pointsGenerate() {
  function getRandomEl() {
    return getRandomNum() % 2 === 0;
  }

  function getSelectedOffers(offers) {
    return {
      type: offers.type,
      offers: offers.offers.filter(getRandomEl),
    };
  }

  const points = [];
  for (let i = 0; i < POINTS_COUNT; i++) {
    const offers = getRandomFromArray(allOffers);
    const newPoint = new PointMock(getSelectedOffers(offers), offers); /*создание объекта новой точки*/
    points.push(newPoint); /*размещение точки в массив сгенерированных точек*/
  }
  return points;
}());
