import BoardPresenter from './presenter/boardPresnter.js';

const containers = {
  container: document.querySelector('.trip-events'),
  filterContainer: document.querySelector('.trip-controls__filters')
};

const mainPresenter = new BoardPresenter(containers);
mainPresenter.init();
