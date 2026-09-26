const EMPTY_MASSAGE = {
  Everthing: 'Click New Event to create your first point',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now',
};
const FilterType = {
  EVERETHING: 'everthing',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { EMPTY_MASSAGE, FilterType, SortType, UpdateType, UserAction };
