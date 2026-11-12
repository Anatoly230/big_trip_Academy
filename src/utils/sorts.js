import { SortType } from '../const.js';
import dayjs from 'dayjs';

function getSorts(sortType) {

  const disabled = {
    offers: true,
    event: true,
    day: false,
    time: false,
    price: false,
  };

  function getSortsObject(s) {
    return {
      sort: s,
      isActive: s === sortType,
      isDisabled: disabled[s],
    };
  }
  return Object.values(SortType).map(getSortsObject);
}

function getCleanSortValue(sortValue) {
  return /^\w+?-(\w+)/gm.exec(sortValue)[1];
}

function getTotalOffersPrice(total, id) {
  total += this[id].price;
  return total;
};



export const sort = {
  [SortType.DEFAULT]: (a, b) => dayjs(a.dateFrom) - dayjs(b.dateTo),
  [SortType.TIME]: (a, b) => dayjs(b.dateTo).diff(b.dateFrom, 'm') - dayjs(a.dateTo).diff(a.dateFrom, 'm'),
  [SortType.PRICE]: function (a, b) {
    const totalA = a.offers.reduce(getTotalOffersPrice.bind(this), 0)
    const totalB = b.offers.reduce(getTotalOffersPrice.bind(this), 0)
    return (b.basePrice + totalB) - (a.basePrice + totalA);
  },

}
export { getSorts, getCleanSortValue};
