import { getRandomNum, getRandomFromArray, getId } from '../utils.js';
import { cities, cityDescriptions, imageDescriptions } from './destenation-info.js';

const PREFIX = 'DEST';
const DESTCOUNT = cities.length;

class DestanationData {
  constructor() {
    this.cities = cities;
    this.descriptions = cityDescriptions;
    this.imageDescriptions = imageDescriptions;
  }

  getRandomImage() {
    return `https://loremflickr.com/248/152?random=${getRandomNum()}`;
  }

  getId() {
    return getId(PREFIX);
  }

  getCityInfo() {
    return {
      src: this.getRandomImage(),
      description: getRandomFromArray(imageDescriptions),
    };
  }

  getCityInfoArray() {
    return Array.
      from({ length: this.getRandomNum() }, this.getCityInfo.bind(this));
  }

  getCityDesription() {
    return getRandomFromArray(this.descriptions);
  }

  getRandomNum() {
    return getRandomNum(1, 5);
  }

  getDestenation() {
    return {
      name: getRandomFromArray(this.cities),
      id: this.getId(),
      description: this.getCityDesription(),
      pictures: this.getCityInfoArray()
    };
  }
}

export const destenations = (function getDestenations() {
  const destCombain = new DestanationData();
  return Array.
    from({ length: DESTCOUNT }, destCombain.getDestenation.bind(destCombain));
}());
