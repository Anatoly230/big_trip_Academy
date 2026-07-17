import { getRandomFromArray, getId, getRandomPrice, getRandomNum } from '../utils.js';
import { offerDataCombine } from './offer-mock.js';
import { destenations } from './destenation-mock.js';


const PRFIX = 'PNT';
const pointsCount = 5;

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
  #pointOffers = offerDataCombine();
  constructor() {
    this.id = getId(PRFIX);
    this.basePrice = getRandomPrice();
    this.dateFrom = timeEnlarger(10, 30).toJSON();
    this.dateTo = timeEnlarger().toJSON();
    this.destination = getRandomFromArray(destenations)['id'];/* айди города из статичных данных */
    this.isFavorite = getRandomNum() % 2 === 1; /* выбрано как 'лучшее' */
    this.offers = this.#pointOffers.offers.map(getOfersId);
    this.type = this.#pointOffers.type;
  }

  getOffers() {
    return this.#pointOffers;
  }

}

const pointsGen = (function pointsGenerate(count = pointsCount) {
  let allOffers = [];

  function copyToArray(el) {
    allOffers.push(el);
  }

  return function getPoint(check) {
    const points = [];

    if (check === 'all') { /*при вызове функции с параметром 'all', она отдаст весь список сгенерированных офферов*/
      return allOffers;
    }
    if (check === 'clear') { /*при вызове функции с параметром 'clear', хачищается массив от старфх оферов*/
      allOffers = [];
    }
    for (let i = 0; i < count; i++) {
      const newPoint = new PointMock(); /*создание объекта новой точки*/
      points.push(newPoint); /*размещение точки в массив сгенерированных точек*/
      allOffers.push(newPoint.getOffers()); /*на протяжении отработки функции, все точки попадают в массив allOffers*/
      // newPoint.getOffers().forEach(copyToArray); /*на протяжении отработки функции, все точки попадают в массив allOffers*/
    }
    return points;
  };

}());

export const allPoints = pointsGen();
export const allOffers = pointsGen('all');
