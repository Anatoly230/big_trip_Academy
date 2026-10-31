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

function sortTimeUp(a, b) {
  return dayjs(b.dateTo).diff(b.dateFrom, 'm') - dayjs(a.dateTo).diff(a.dateFrom, 'm');
}

function sortPriceUp(a, b) {
  return b.basePrice - a.basePrice;
}

// function sortDayUp(a, b) {
//   return b.basePrice - a.basePrice;
// }


export { getSorts, getCleanSortValue, sortTimeUp, sortPriceUp };
