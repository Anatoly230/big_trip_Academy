import { FilterType } from '../const.js';
import dayjs from 'dayjs';

function getFilters(filter) {
  function getFiltersObject(f) {
    return {
      filter: f,
      isActive: f === filter,
    };
  }
  return Object.values(FilterType).map(getFiltersObject);
}

const filters = {
  [FilterType.EVERETHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.point.dateFrom).diff(dayjs(), 'd') > 0),
  [FilterType.PRESENT]: (points) => {
    points.filter((point) => {
      const startTime = dayjs(point.point.dateFrom).diff(dayjs(), 'd');
      const endTime = dayjs(point.point.dateTo).diff(dayjs(), 'd');
      return startTime <= 0 && endTime >= 0;
    })
  },
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.point.dateTo).diff(dayjs(), 'd') < 0),
};

export { getFilters, filters };
