import { getRandomNum, getRandomFromArray, cutRandomFromArray, getId, getRandomPrice } from '../utils/utils.js';
import { offers, offerTypes } from './offer-info.js';

export const offerDataCombine = (function offerDataGenerate() {
  const PREFIX = 'OFR';
  const optionName = 0;
  const optionTitle = 1;
  let type = null;
  let typeItems = null;
  let typeOption = null;

  function copyItems(el) {
    return el;
  }
  function getOfferTemlate() {
    typeOption = cutRandomFromArray(typeItems);/*забираю из массива элемент, чтобы следующий выбор не повторился*/
    return {
      id: getId(PREFIX),
      option: typeOption[optionName],
      title: typeOption[optionTitle],
      price: getRandomPrice(300),
    };
  }

  return function getOffers() {
    type = getRandomFromArray(offerTypes); /*определение случайного типа поездки*/
    typeItems = offers[type].map(copyItems); /*копирование массива опций согласно получившемуся типу. Этот массив будет уменьшаться чтобы не повторился следующий выбор*/
    return {
      type: type,
      offers: Array
        .from({ length: typeItems.length - 1 }, getOfferTemlate),
    };
  };
}());
